import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleDTO } from '../../models/dtos/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() article!: ArticleDTO;

  constructor(private readonly _router: Router) {}

  viewProduct() {
    this._router.navigate([`view-article/${this.article.id}`]);
  }
}
