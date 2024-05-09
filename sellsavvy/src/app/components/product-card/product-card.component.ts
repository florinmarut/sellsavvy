import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleDTO } from '../../models/dtos/article.model';
import { Router } from '@angular/router';
import { CartItemsService } from '../../services/apis/cart-items.service';
import { CartItemCreateDTO } from '../../models/dtos/cart-item.model';
import { UserDTO } from '../../models/dtos/user.model';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() article!: ArticleDTO;
  @Input() loggedInUser: UserDTO | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _cartService: CartItemsService
  ) {}

  viewProduct() {
    this._router.navigate([`view-article/${this.article.id}`]);
  }

  addToCart() {
    const cartItem: CartItemCreateDTO = {
      amount: 1,
      articleId: this.article.id,
      userId: this.loggedInUser?.id ?? '',
    };
    this._cartService.createCartItem(cartItem).subscribe({
      next: (value) => {},
      error: (err) => console.error(err),
    });
  }
}
