import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ArticleDTO } from '../../models/dtos/article.model';
import { UserDTO } from '../../models/dtos/user.model';

@Component({
  selector: 'paged-table',
  standalone: true,
  imports: [MatGridListModule, ProductCardComponent],
  templateUrl: './paged-table.component.html',
  styleUrl: './paged-table.component.scss',
})
export class PagedTableComponent {
  @Input() columns: number = 4;
  @Input() articles: ArticleDTO[] | undefined;
  @Input() loggedInUser: UserDTO | undefined;
  @Input() canEdit: boolean = false;
}
