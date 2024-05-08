import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AddressesService } from '../../services/apis/addresses.service';
import {
  Subject,
  catchError,
  map,
  of,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { AddressDTO } from '../../models/dtos/address.model';
import { MatSelectModule } from '@angular/material/select';
import { COUNTRIES, STATES } from '../../models/constants.const';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  form: FormGroup | undefined;
  isFormInEditMode = false;
  countries = COUNTRIES;
  states = STATES;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _addressService: AddressesService,
    private readonly _authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    const addressId$ = this._route.paramMap.pipe(
      takeUntil(this.destroy$),
      catchError((err) => throwError(() => err)),
      map((params) => params.get('id'))
    );
    addressId$
      .pipe(
        switchMap((id) => (id ? this._addressService.getAddress(id) : of(null)))
      )
      .subscribe({
        next: (address) => {
          if (address) this.isFormInEditMode = true;
          this.initForm(address);
        },
        error: (err) => console.log(err),
      });
  }

  initForm(address: AddressDTO | null) {
    this.form = this._formBuilder.group({
      id: [address?.id != null ? address.id : ''],
      city: [address?.city != null ? address.city : ''],
      state: [address?.state != null ? address.state : ''],
      country: [address?.country != null ? address.country : ''],
      street: [address?.street != null ? address.street : ''],
      zip: [address?.zip != null ? address.zip : ''],
    });
  }

  onSubmit() {
    const address = this.form?.value;
    if (this.isFormInEditMode) {
      this._authService
        .getProfile()
        .pipe(
          (takeUntil(this.destroy$),
          catchError((err) => throwError(() => err))),
          map((user) => user),
          switchMap((user) => {
            address.userId = user.id;
            return this._addressService.updateAddress(address);
          })
        )
        .subscribe({
          next: (value) => {
            this._router.navigate(['success']);
          },
          error: (err) => {
            console.log(err);
            this._router.navigate(['fail']);
          },
        });
    } else {
      this._authService
        .getProfile()
        .pipe(
          (takeUntil(this.destroy$),
          catchError((err) => throwError(() => err))),
          map((user) => user),
          switchMap((user) => {
            address.userId = user.id;
            return this._addressService.createAddress(address);
          })
        )
        .subscribe({
          next: (value) => {
            this._router.navigate(['success']);
          },
          error: (err) => {
            console.log(err);
            this._router.navigate(['fail']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
