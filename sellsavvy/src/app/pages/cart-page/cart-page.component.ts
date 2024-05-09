import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItemsService } from '../../services/apis/cart-items.service';
import { AuthenticationService } from '../../services/authentication.service';
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
import { CartItemDTO } from '../../models/dtos/cart-item.model';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";

@Component({
    selector: 'app-cart-page',
    standalone: true,
    templateUrl: './cart-page.component.html',
    styleUrl: './cart-page.component.scss',
    imports: [CartItemComponent]
})
export class CartPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  cartItems!: CartItemDTO[];
  user!: UserDTO;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _cartService: CartItemsService
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
        switchMap((user: UserDTO) => this.fetchCartItems(user))
      )
      .subscribe({
        next: (cartItems) => {
          this.cartItems = cartItems;
        },
        error: (err) => console.error(err),
      });
  }

  fetchCartItems(user: UserDTO): Observable<CartItemDTO[]> {
    return this._cartService.getCartItemsByUserId(user.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
