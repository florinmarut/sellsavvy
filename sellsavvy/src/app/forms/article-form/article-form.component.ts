import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/apis/articles.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SuccessCardComponent } from '../../components/success-card/success-card.component';
import { FailCardComponent } from '../../components/fail-card/fail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDTO } from '../../models/dtos/user.model';
import { Subscription, catchError, map, switchMap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDTO } from '../../models/dtos/article.model';

@Component({
  selector: 'article-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SuccessCardComponent,
    FailCardComponent,
    MatProgressSpinnerModule,
    SuccessCardComponent,
    FailCardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  articleForm!: FormGroup;
  isFormSubmitted = false;
  isFormSubmittedWithErrors = false;
  isLoading = false;
  isFormInEditMode = false;

  private _articleId!: string;

  postArticleSubscription!: Subscription;

  constructor(
    private readonly _articlesService: ArticlesService,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.initArticleForm();

    this._route.paramMap.subscribe((params) => {
      this.initArticleForm(params.get('id') as string);
    });
  }

  initArticleForm(id?: string) {
    if (id) {
      this.isFormInEditMode = true;
      this._articlesService.getArticle(id).subscribe({
        next: (article: ArticleDTO) => {
          this._articleId = article.id;
          this.articleForm = this._formBuilder.group({
            title: [article.title, [Validators.required]],
            description: [article.description, [Validators.required]],
            price: [article.price, [Validators.required]],
            stock: [article.stock, [Validators.required]],
          });
        },
        error: (err) => {
          console.error(err);
          this._router.navigate(['/fail']);
        },
      });
    } else {
      this.isFormInEditMode = false;
      this.articleForm = this._formBuilder.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: [0, [Validators.required]],
        stock: [1, [Validators.required]],
      });
    }
  }

  onSubmit() {
    this.isLoading = true;
    const article = this.articleForm.value;

    if (this._articleId) article.id = this._articleId;

    this.postArticleSubscription = this._authService
      .getProfile()
      .pipe(
        map((user) => {
          article.sellerId = user?.id;
          return article;
        }),
        catchError((error) => {
          this.isLoading = false;
          this.isFormSubmittedWithErrors = true;
          this.isFormSubmitted = false;
          return throwError(() => new Error(error));
        }),
        switchMap((value) => {
          if (!this.isFormInEditMode) {
            return this._articlesService.createArticle(value).pipe(
              map((articleValue) => {
                this.isLoading = false;
                this.isFormSubmittedWithErrors = false;
                this.isFormSubmitted = true;
              }),
              catchError((error) => {
                this.isLoading = false;
                this.isFormSubmittedWithErrors = true;
                this.isFormSubmitted = false;
                return throwError(() => new Error(error));
              })
            );
          } else {
            return this._articlesService
              .updateArticle(value)
              .pipe(
                map((articleValue) => {
                  this.isLoading = false;
                  this.isFormSubmittedWithErrors = false;
                  this.isFormSubmitted = true;
                }),
                catchError((error) => {
                  this.isLoading = false;
                  this.isFormSubmittedWithErrors = true;
                  this.isFormSubmitted = false;
                  return throwError(() => new Error(error));
                })
              );
          }
        })
      )
      .subscribe();

    // this._articlesService.createArticle(article).subscribe({
    //   next: (value) => {
    //     this.isLoading = false;
    //     this.isFormSubmittedWithErrors = false;
    //     this.isFormSubmitted = true;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.isLoading = false;
    //     this.isFormSubmittedWithErrors = true;
    //     this.isFormSubmitted = true;
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.postArticleSubscription?.unsubscribe();
  }
}
