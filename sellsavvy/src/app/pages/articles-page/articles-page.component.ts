import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagedTableComponent } from '../../components/paged-table/paged-table.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ArticlesService } from '../../services/apis/articles.service';
import {
  Observable,
  Subject,
  catchError,
  map,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';
import { ArticleDTO } from '../../models/dtos/article.model';
import { PagedData } from '../../models/dtos/paged.model';

@Component({
  selector: 'articles-page',
  standalone: true,
  imports: [PagedTableComponent],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.scss',
})
export class ArticlesPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user: UserDTO | undefined;
  pagedArticles: PagedData<ArticleDTO> | undefined;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _articlesService: ArticlesService
  ) {}
  ngOnInit(): void {
    this._authService
      .getProfile()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => throwError(() => err)),
        map((user: UserDTO) => {
          this.user = user;
          return user;
        }),
        switchMap((user: UserDTO) => this.fetchArticles())
      )
      .subscribe({
        next: (pagedArticles) => {
          this.pagedArticles = pagedArticles;
        },
        error: (err) => console.error(err),
      });
  }
  fetchArticles(): Observable<PagedData<ArticleDTO>> {
    return this._articlesService.getPaged(1, 5);
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
