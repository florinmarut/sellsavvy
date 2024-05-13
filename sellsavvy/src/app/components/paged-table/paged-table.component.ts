import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDTO } from '../../models/dtos/product.model';
import { UserDTO } from '../../models/dtos/user.model';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'paged-table',
  standalone: true,
  imports: [MatGridListModule, ProductCardComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './paged-table.component.html',
  styleUrl: './paged-table.component.scss',
})
export class PagedTableComponent implements OnInit, OnDestroy {
  @Input() columns: number = 4;
  @Input() products: ProductDTO[] | undefined;
  @Input() loggedInUser: UserDTO | undefined;
  @Input() canEdit: boolean = false;

  destroyed = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {}

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

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
