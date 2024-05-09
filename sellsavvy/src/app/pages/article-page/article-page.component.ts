import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ArticleDTO } from '../../models/dtos/article.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {
  Subscription,
  catchError,
  combineLatest,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { ArticlesService } from '../../services/apis/articles.service';
import { ReviewCreateDTO, ReviewDTO } from '../../models/dtos/review.model';
import { ReviewsService } from '../../services/apis/reviews.service';
import { PagedData } from '../../models/dtos/paged.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'article-page',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  article: ArticleDTO | undefined;
  reviews: PagedData<ReviewDTO> | undefined;
  reviewForm!: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _articlesService: ArticlesService,
    private readonly _reviewsService: ReviewsService,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const fetchData$ = this._route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        return combineLatest([
          this._articlesService.getArticle(id as string),
          this._reviewsService.getPagedReviews(
            1,
            15,
            `ArticleId==\"${id}\"`,
            'id',
            'desc'
          ),
        ]);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );

    const fetchDataSubscription = fetchData$.subscribe({
      next: ([article, reviews]) => {
        this.article = article;
        this.reviews = reviews;
      },
      error: (err) => console.error(err),
    });

    this.subscriptions.push(fetchDataSubscription);
  }

  initForm() {
    this.reviewForm = this._formBuilder.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  onSubmitReview() {
    const value = { ...this.reviewForm.value };

    const postReview$ = this._authService.getProfile().pipe(
      map((user) => {
        const review: ReviewCreateDTO = {
          comment: value.comment,
          rating: value.rating,
          articleId: this.article?.id as string,
          userId: user.id,
        };

        return review;
      }),
      switchMap((review) =>
        combineLatest([
          this._reviewsService.createReview(review),
          this._reviewsService.getPagedReviews(
            1,
            15,
            `ArticleId==\"${review.articleId}\"`,
            'id',
            'desc'
          ),
        ])
      ),
      catchError((error) => throwError(() => error))
    );

    const postSubscription = postReview$.subscribe({
      next: ([postResponse, reviews]) => {
        this.reviews = reviews;
      },
      error: (err) => console.error(err),
    });
    this.subscriptions.push(postSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
