import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'paged-table',
  standalone: true,
  imports: [MatGridListModule, ProductCardComponent],
  templateUrl: './paged-table.component.html',
  styleUrl: './paged-table.component.scss',
})
export class PagedTableComponent {
  @Input() columns: number = 4;
}
