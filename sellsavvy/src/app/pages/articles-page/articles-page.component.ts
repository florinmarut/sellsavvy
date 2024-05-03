import { Component } from '@angular/core';
import { PagedTableComponent } from '../../components/paged-table/paged-table.component';

@Component({
  selector: 'articles-page',
  standalone: true,
  imports: [PagedTableComponent],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.scss',
})
export class ArticlesPageComponent {}
