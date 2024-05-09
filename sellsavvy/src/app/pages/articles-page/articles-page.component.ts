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
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'articles-page',
  standalone: true,
  imports: [PagedTableComponent, MatButtonModule],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.scss',
})
export class ArticlesPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user: UserDTO | undefined;
  pagedArticles: PagedData<ArticleDTO> | undefined;
  canEdit: boolean = false;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _articlesService: ArticlesService,
    private readonly _router: Router
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
        switchMap((user: UserDTO) => this.fetchArticles(user))
      )
      .subscribe({
        next: (pagedArticles) => {
          this.pagedArticles = pagedArticles;
        },
        error: (err) => console.error(err),
      });
  }
  fetchArticles(user: UserDTO): Observable<PagedData<ArticleDTO>> {
    if (this._router.url === '/my-products') {
      this.canEdit = true;
      return this._articlesService.getPaged(1, 5, `SellerId == "${user.id}"`);
    }
    return this._articlesService.getPaged(1, 5);
  }

  addProduct() {
    this._router.navigate(['create-product']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
