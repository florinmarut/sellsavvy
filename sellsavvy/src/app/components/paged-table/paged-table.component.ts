import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDTO } from '../../models/dtos/product.model';
import { UserDTO } from '../../models/dtos/user.model';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'paged-table',
  standalone: true,
  imports: [
    MatGridListModule,
    ProductCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './paged-table.component.html',
  styleUrl: './paged-table.component.scss',
})
export class PagedTableComponent implements OnInit, OnDestroy {
  @Input() columns: number = 1;
  @Input() products: ProductDTO[] | undefined;
  @Input() loggedInUser: UserDTO | undefined;
  @Input() canEdit: boolean = false;

  currentPage = 0;
  pageSize = 10;
  destroyed = new Subject<void>();

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridColumns((event.target as Window).innerWidth);
  }

  updateGridColumns(width: number): void {
    this.columns = width <= 768 ? 1 : 4;
  }

  constructor(private breakpointObserver: BreakpointObserver) { }

  trackProduct(index: number, product: ProductDTO): string {
    return product.id;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        if (result.matches) {
          this.columns = 1;
        } else {
          this.columns = 4;
        }
      });
  }

  onSearch(): void {
    // Implement search logic here
  }

  onSearchButtonClick(): void {
    // Implement search button click logic here
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
