import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemDTO } from '../../models/dtos/cart-item.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item!: CartItemDTO;
  @Output() remove = new EventEmitter<CartItemDTO>();

  constructor(private readonly _router: Router) {}

  viewProduct() {
    this._router.navigate([`view-product/${this.item.product.id}`]);
  }
  removeItem() {this.remove.emit(this.item)}
}
