import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderDTO, OrderUpdateDTO } from '../../models/dtos/order.model';
import { UserDTO } from '../../models/dtos/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { OrdersService } from '../../services/apis/orders.service';
import {
  Observable,
  Subject,
  catchError,
  map,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { OrderComponent } from "../../components/order/order.component";

@Component({
    selector: 'orders-page',
    standalone: true,
    templateUrl: './orders-page.component.html',
    styleUrl: './orders-page.component.scss',
    imports: [OrderComponent]
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders!: OrderDTO[];
  user!: UserDTO;

  destroy$ = new Subject();

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.fetchOrders().subscribe({
      next: (orders) => (this.orders = orders),
      error: (err) => console.error(err),
    });
  }

  fetchOrders(): Observable<OrderDTO[]> {
    return this._authService.getProfile().pipe(
      takeUntil(this.destroy$),
      catchError((err) => throwError(() => err)),
      map((user: UserDTO) => {
        this.user = user;
        return user;
      }),
      switchMap((user: UserDTO) =>
        this._ordersService.getOrdersByUserId(user.id)
      )
    );
  }

  cancelOrder(order: OrderUpdateDTO) {
    this._ordersService
      .updateOrder(order)
      .pipe(switchMap(() => this.fetchOrders()))
      .subscribe({
        next: (orders) => (this.orders = orders),
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
