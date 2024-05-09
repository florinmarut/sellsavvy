import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddressesService } from '../../services/apis/addresses.service';
import { AuthenticationService } from '../../services/authentication.service';
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
import { PagedData } from '../../models/dtos/paged.model';
import { AddressDTO } from '../../models/dtos/address.model';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'address-list',
  standalone: true,
  imports: [AddressComponent],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  addresses: PagedData<AddressDTO> | undefined;
  user!: UserDTO;

  constructor(
    private readonly _addressesService: AddressesService,
    private readonly _authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._authService
      .getProfile()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => throwError(() => err)),
        map((user: UserDTO) => {
          this.user = user;
          return user;
        }),
        switchMap((user: UserDTO) => this.fetchAddresses(user.id))
      )
      .subscribe({
        next: (pagedAddresses) => {
          this.addresses = pagedAddresses;
        },
        error: (err) => console.error(err),
      });
  }

  fetchAddresses(userId: string): Observable<PagedData<AddressDTO>> {
    return this._addressesService.getPaged(1, 5, `UserId == "${userId}"`);
  }

  deleteAddress(address: AddressDTO) {
    this._addressesService.deleteAddress(address.id).subscribe({
      next: (value) => {
        this.fetchAddresses(this.user.id).subscribe({
          next: (addresses) => (this.addresses = addresses),
          error: (err) => console.error(err),
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
