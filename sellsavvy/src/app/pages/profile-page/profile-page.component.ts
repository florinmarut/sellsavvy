import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';
import { Router } from '@angular/router';
import { AddressListComponent } from '../../components/address-list/address-list.component';
import { UsersService } from '../../services/apis/users.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [MatButtonModule, AddressListComponent],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user: UserDTO | undefined;
  addressListFilter: string | undefined;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UsersService,
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

  logout() {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this._router.navigate(['success']);
        },
        error: (err) => {
          console.error(err);
          this._router.navigate(['fail']);
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
