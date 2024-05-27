import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDTO, OrderUpdateDTO } from '../../models/dtos/order.model';
import { OrderStatus, OrderStatuses } from '../../models/constants.const';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'sold-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './sold-item.component.html',
  styleUrl: './sold-item.component.scss',
})
export class SoldItemComponent {
  @Input() value!: OrderDTO;
  @Output() status = new EventEmitter<OrderUpdateDTO>();

  statuses = OrderStatuses;

  constructor(private readonly _router: Router) {}
  viewProduct() {
    this._router.navigate([`view-product/${this.value.productId}`]);
  }

  changeStatus() {
    this.status.emit(this.value);
  }
}
