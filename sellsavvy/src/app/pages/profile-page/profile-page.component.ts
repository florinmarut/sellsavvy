import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { SingleFileUploadComponent } from '../../components/single-file-upload/single-file-upload.component';
import { Subject, takeUntil } from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';
import { Router } from '@angular/router';
import { AddressListComponent } from '../../components/address-list/address-list.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [MatButtonModule, SingleFileUploadComponent, AddressListComponent],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user: UserDTO | undefined;
  addressListFilter: string | undefined;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly _router: Router
  ) {}

  ngOnInit() {
    this.authService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: UserDTO) => {
          console.log(`The user is ${user.email}`);
          this.user = user;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  openEditForm() {
    this._router.navigate(['update-profile']);
  }

  openAddressForm() {
    this._router.navigate(['create-address']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
