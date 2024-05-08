import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {
  Subject,
  catchError,
  map,
  of,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/apis/users.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  form: FormGroup | undefined;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UsersService
  ) {}

  ngOnInit(): void {
    this._authService.isLoggedIn
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => throwError(() => err)),
        map((isLoggedIn) => isLoggedIn),
        switchMap((isLoggedIn) =>
          isLoggedIn ? this._authService.getProfile() : of(null)
        )
      )
      .subscribe({
        next: (user: UserDTO | null) => {
          user && this.initForm(user);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  initForm(user: UserDTO) {
    this.form = this._formBuilder.group({
      id: [user.id],
      phoneNumber: [user.phoneNumber],
      email: [user.email],
      description: [user.description],
      firstName: [user.firstName],
      lastName: [user.lastName],
    });
  }

  onSubmit() {
    const user = this.form?.value;
    this._userService
      .updateUser(user)
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
