import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagedTableComponent } from '../../components/paged-table/paged-table.component';
import { AuthenticationService } from '../../services/authentication.service';
import { productsService } from '../../services/apis/products.service';
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

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [PagedTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user: UserDTO | undefined;
  pagedproducts: PagedData<ProductDTO> | undefined;
  canEdit: boolean = false;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _productsService: productsService,
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
      switchMap((user: UserDTO) => this.fetchproducts(user))
    );

    this._authService.isLoggedIn
      .pipe(
        map((isUserLoggedIn) => isUserLoggedIn),
        switchMap((isUserLoggedIn) =>
          isUserLoggedIn ? fetchProfileAndProducts$ : this.fetchproducts(null)
        )
      )
      .subscribe({
        next: (pagedproducts) => {
          this.pagedproducts = pagedproducts;
        },
        error: (err) => console.error(err),
      });
  }
  fetchproducts(user: UserDTO | null): Observable<PagedData<ProductDTO>> {
    if (this._router.url === '/my-products') {
      this.canEdit = true;
      return this._productsService.getPaged(1, 5, `SellerId == "${user?.id}"`);
    }
    return this._productsService.getPaged(1, 5);
  }

  addProduct() {
    this._router.navigate(['create-product']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
