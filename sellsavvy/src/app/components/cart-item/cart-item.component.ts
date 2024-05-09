import { Component, Input } from '@angular/core';
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

  constructor(private readonly _router: Router) {}

  viewProduct() {}
  remove() {}
}
