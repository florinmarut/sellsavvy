import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { ProductsService } from '../../services/apis/products.service';
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
import { ProductDTO } from '../../models/dtos/product.model';
import { CartItemCreateDTO } from '../../models/dtos/cart-item.model';
import { CartItemsService } from '../../services/apis/cart-items.service';
import { UserDTO } from '../../models/dtos/user.model';

@Component({
  selector: 'product-page',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: ProductDTO | undefined;
  reviews: PagedData<ReviewDTO> | undefined;
  reviewForm!: FormGroup;
  loggedInUser: UserDTO | null | undefined;
  isAddedToCart: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _productsService: ProductsService,
    private readonly _reviewsService: ReviewsService,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _cartService: CartItemsService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const userSubscription = this._authService.user.subscribe((user) => {
      this.loggedInUser = user;

      const fetchData$ = this._route.paramMap.pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (!id) {
            throw new Error('Product ID is required');
          }
          return combineLatest([
            this._productsService.getproduct(id),
            this._reviewsService.getPagedReviews(
              1,
              15,
              `ProductId=="${id}"`,
              'id',
              'desc'
            ),
          ]);
        }),
        catchError((error) => {
          console.error('Failed to fetch product or reviews', error);
          return throwError(() => error);
        })
      );

      const fetchDataSubscription = fetchData$.subscribe({
        next: ([product, reviews]) => {
          this.product = product;
          this.reviews = reviews;
        },
        error: (err) => console.error(err),
      });

      this.subscriptions.push(fetchDataSubscription);
    });

    this.subscriptions.push(userSubscription);
  }

  initForm() {
    this.reviewForm = this._formBuilder.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  addToCart() {
    const cartItem: CartItemCreateDTO = {
      amount: 1,
      productId: this.product?.id ?? '',
      userId: this.loggedInUser?.id ?? '',
    };
    this._cartService.createCartItem(cartItem).subscribe({
      next: (value) => {
        this.isAddedToCart = true;
      },
      error: (err) => console.error(err),
    });
  }

  onSubmitReview() {
    const value = { ...this.reviewForm.value };

    const postReview$ = this._authService.getProfile().pipe(
      map((user) => {
        const review: ReviewCreateDTO = {
          comment: value.comment,
          rating: value.rating,
          productId: this.product?.id as string,
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
            `productId==\"${review.productId}\"`,
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
