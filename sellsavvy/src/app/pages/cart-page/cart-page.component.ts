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
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {
  CountriesMap,
  OrderStatus,
  StatesMap,
} from '../../models/constants.const';
import { CommonModule } from '@angular/common';
import { ProductDTO } from '../../models/dtos/product.model';
import { OrderCreateDTO } from '../../models/dtos/order.model';
import { OrdersService } from '../../services/apis/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  imports: [
    CartItemComponent,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
  ],
})
export class CartPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  cartItems!: CartItemDTO[];
  addresses!: AddressDTO[];
  user!: UserDTO;
  selectedAddressId!: string;
  countries = CountriesMap;
  states = StatesMap;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _cartService: CartItemsService,
    private readonly _addressesService: AddressesService,
    private readonly _ordersService: OrdersService,
    private readonly _router: Router
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

  buildOrder(
    cartItem: CartItemDTO,
    buyerId: string,
    addressId: string
  ): OrderCreateDTO {
    return {
      status: OrderStatus.Placed,
      price: cartItem.amount * cartItem.product.price,
      buyerId: buyerId,
      sellerId: cartItem.product.sellerId,
      addressId: addressId,
      productId: cartItem.productId,
    };
  }

  buildOrdersList(
    cartItems: CartItemDTO[],
    buyerId: string,
    addressId: string
  ): OrderCreateDTO[] {
    return cartItems.map<OrderCreateDTO>(
      (cartItem: CartItemDTO): OrderCreateDTO => {
        return this.buildOrder(cartItem, buyerId, addressId);
      }
    );
  }

  createOrders(orders: OrderCreateDTO[]): Observable<any> {
    return this._ordersService.createOrdersList(orders).pipe(
      takeUntil(this.destroy$),
      catchError((err) => throwError(() => err)),
      switchMap(() => this._cartService.clearCart(this.user.id))
    );
  }

  submitOrder() {
    const [selectedAddress] = this.addresses.filter(
      (a) => a.id === this.selectedAddressId
    );

    const orders = this.buildOrdersList(
      this.cartItems,
      this.user.id,
      this.selectedAddressId
    );

    this.createOrders(orders).subscribe({
      next: (value) => {
        this._router.navigate(['success']);
      },
      error: (err) => {
        console.log(err);
        this._router.navigate(['fail']);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
