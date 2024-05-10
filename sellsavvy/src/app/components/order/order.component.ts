import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDTO, OrderUpdateDTO } from '../../models/dtos/order.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { OrderStatus } from '../../models/constants.const';
import { OrderStatuses } from '../../models/constants.const';

@Component({
  selector: 'order',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() value!: OrderDTO;
  @Output() cancel = new EventEmitter<OrderUpdateDTO>();

  statuses = OrderStatuses;

  constructor(private readonly _router: Router) {}
  viewProduct() {
    this._router.navigate([`view-product/${this.value.productId}`]);
  }

  cancelOrder() {
    const canceledOrder: OrderUpdateDTO = {
      id: this.value.id,
      status: OrderStatus.Returned,
      price: this.value.price,
      buyerId: this.value.buyerId,
      sellerId: this.value.sellerId,
      addressId: this.value.addressId,
      productId: this.value.productId,
    };
    this.cancel.emit(canceledOrder);
  }
}
