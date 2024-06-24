import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagedTableComponent } from '../../components/paged-table/paged-table.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductsService } from '../../services/apis/products.service';
import {
  Observable,
  Subject,
  catchError,
  map,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';
import { ProductDTO } from '../../models/dtos/product.model';
import { PagedData } from '../../models/dtos/paged.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [
    PagedTableComponent,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user: UserDTO | undefined;
  pagedproducts: PagedData<ProductDTO> | undefined;
  canEdit: boolean = false;
  pageSize: number = 5;
  pageNumber: number = 1;
  filters: string | undefined;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _productsService: ProductsService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    let fetchProfileAndProducts$ = this._authService.getProfile().pipe(
      takeUntil(this.destroy$),
      catchError((err) => throwError(() => err)),
      map((user: UserDTO) => {
        this.user = user;
        return user;
      }),
      switchMap((user: UserDTO) =>
        this.fetchProducts(user, this.pageNumber, this.pageSize)
      )
    );

    this._authService.isLoggedIn
      .pipe(
        map((isUserLoggedIn) => isUserLoggedIn),
        switchMap((isUserLoggedIn) =>
          isUserLoggedIn
            ? fetchProfileAndProducts$
            : this.fetchProducts(undefined, this.pageNumber, this.pageSize)
        )
      )
      .subscribe({
        next: (pagedproducts) => {
          this.pagedproducts = pagedproducts;
        },
        error: (err) => console.error(err),
      });
  }

  fetchProducts(
    user: UserDTO | undefined,
    pageNumber: number,
    pageSize: number
  ): Observable<PagedData<ProductDTO>> {
    if (this._router.url === '/my-products') {
      this.canEdit = true;
      return this._productsService.getPaged(
        pageNumber,
        pageSize,
        `SellerId == "${user?.id}"`
      );
    }
    return this._productsService.getPaged(pageNumber, pageSize, this.filters);
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchProducts(this.user, this.pageNumber, this.pageSize).subscribe({
      next: (pagedproducts) => {
        this.pagedproducts = pagedproducts;
      },
      error: (err) => console.error(err),
    });
  }

  addProduct() {
    this._router.navigate(['create-product']);
  }

  onSearchButtonClick(searchValue: string): void {
    this.filters = `Title.ToLower().Contains("${searchValue.toLowerCase()}")`;
    this.pageNumber = 1; // Reset to first page on search
    this.fetchProducts(this.user, this.pageNumber, this.pageSize).subscribe({
      next: (pagedproducts) => {
        this.pagedproducts = pagedproducts;
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
