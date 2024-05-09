import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItemsService } from '../../services/apis/cart-items.service';
import { AuthenticationService } from '../../services/authentication.service';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';
import { CartItemDTO } from '../../models/dtos/cart-item.model';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { MatButtonModule } from '@angular/material/button';
import { AddressDTO } from '../../models/dtos/address.model';
import { AddressesService } from '../../services/apis/addresses.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  imports: [CartItemComponent, MatButtonModule],
})
export class CartPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  cartItems!: CartItemDTO[];
  addresses!: AddressDTO[];
  user!: UserDTO;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _cartService: CartItemsService,
    private readonly _addressesService: AddressesService
  ) {}
  ngOnInit(): void {
    this.fetchAll().subscribe({
      next: ([cartItems, addresses]) => {
        this.cartItems = cartItems;
        this.addresses = addresses;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchAll(): Observable<[CartItemDTO[], AddressDTO[]]> {
    return this._authService.getProfile().pipe(
      takeUntil(this.destroy$),
      catchError((err) => throwError(() => err)),
      map((user: UserDTO) => {
        this.user = user;
        return user;
      }),
      switchMap((user: UserDTO) =>
        forkJoin([
          // Execute requests in parallel
          this.fetchCartItems(user),
          this.fetchAddresses(user),
        ])
      )
    );
  }

  fetchCartItems(user: UserDTO): Observable<CartItemDTO[]> {
    return this._cartService.getCartItemsByUserId(user.id);
  }

  fetchAddresses(user: UserDTO): Observable<AddressDTO[]> {
    return this._addressesService.getAddressesByUserId(user.id);
  }

  removeCartItem(item: CartItemDTO) {
    this._cartService
      .deleteCartItem(item.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => throwError(() => err)),
        switchMap(() => this.fetchAll())
      )
      .subscribe({
        next: ([cartItems, addresses]) => {
          this.cartItems = cartItems;
          this.addresses = addresses;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
