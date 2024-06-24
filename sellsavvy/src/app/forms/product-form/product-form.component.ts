import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/apis/products.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SuccessCardComponent } from '../../components/success-card/success-card.component';
import { FailCardComponent } from '../../components/fail-card/fail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription, catchError, map, switchMap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../../models/dtos/product.model';
import { FilePickerComponent } from '../../components/file-picker/file-picker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SuccessCardComponent,
    FailCardComponent,
    MatProgressSpinnerModule,
    SuccessCardComponent,
    FailCardComponent,
    MatProgressSpinnerModule,
    FilePickerComponent,
  ],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  isFormSubmitted = false;
  isFormSubmittedWithErrors = false;
  isLoading = false;
  isFormInEditMode = false;
  files: File[] = [];

  private _productId!: string;

  postproductSubscription!: Subscription;

  constructor(
    private readonly _productsService: ProductsService,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.initproductForm();

    this._route.paramMap.subscribe((params) => {
      this.initproductForm(params.get('id') as string);
    });
  }

  initproductForm(id?: string) {
    if (id) {
      this.isFormInEditMode = true;
      this._productsService.getproduct(id).subscribe({
        next: (product: ProductDTO) => {
          this._productId = product.id;
          this.productForm = this._formBuilder.group({
            title: [product.title, [Validators.required]],
            description: [product.description, [Validators.required]],
            price: [product.price, [Validators.required]],
            stock: [product.stock, [Validators.required]],
          });
        },
        error: (err: any) => {
          console.error(err);
          this._router.navigate(['/fail']);
        },
      });
    } else {
      this.isFormInEditMode = false;
      this.productForm = this._formBuilder.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: [0, [Validators.required]],
        stock: [1, [Validators.required]],
      });
    }
  }

  onSubmit() {
    this.isLoading = true;
    const product = this.productForm.value;

    if (this._productId) product.id = this._productId;

    this.postproductSubscription = this._authService
      .getProfile()
      .pipe(
        map((user) => {
          product.sellerId = user?.id;
          return product;
        }),
        catchError((error) => {
          this.isLoading = false;
          this.isFormSubmittedWithErrors = true;
          this.isFormSubmitted = false;
          return throwError(() => new Error(error));
        }),
        switchMap((value) => {
          if (!this.isFormInEditMode) {
            return this._productsService.createproduct(value, this.files).pipe(
              map((productValue) => {
                this.isLoading = false;
                this.isFormSubmittedWithErrors = false;
                this.isFormSubmitted = true;
              }),
              catchError((error) => {
                this.isLoading = false;
                this.isFormSubmittedWithErrors = true;
                this.isFormSubmitted = false;
                return throwError(() => new Error(error));
              })
            );
          } else {
            return this._productsService.updateproduct(value, this.files).pipe(
              map((productValue) => {
                this.isLoading = false;
                this.isFormSubmittedWithErrors = false;
                this.isFormSubmitted = true;
              }),
              catchError((error) => {
                this.isLoading = false;
                this.isFormSubmittedWithErrors = true;
                this.isFormSubmitted = false;
                return throwError(() => new Error(error));
              })
            );
          }
        })
      )
      .subscribe();
  }

  onFilesSelected(files: File[]) {
    this.files = files;
  }

  ngOnDestroy(): void {
    this.postproductSubscription?.unsubscribe();
  }
}
