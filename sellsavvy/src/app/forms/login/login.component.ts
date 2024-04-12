import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { validatePassword } from '../../models/validators';
import { SuccessCardComponent } from '../../components/success-card/success-card.component';
import { FailCardComponent } from '../../components/fail-card/fail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SuccessCardComponent,
    FailCardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginForm implements OnInit {
  loginGroup!: FormGroup;
  isFormSubmitted = false;
  isFormSubmittedWithErrors = false;
  isLoading = false;

  get email() {
    return this.loginGroup.get('email');
  }

  get password() {
    return this.loginGroup.get('password');
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router
  ) {}
  ngOnInit(): void {
    this.loginGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isValid = validatePassword(value);
      return isValid ? null : { passwordStrength: true };
    };
  }

  onSubmit(): void {
    this.isLoading = true;
    this._authService
      .login(this.loginGroup.value, { useCookies: false })
      .subscribe({
        next: (value) => {
          this.isLoading = false;
          this.isFormSubmittedWithErrors = false;
          this.isFormSubmitted = true;
          this._router.navigate(['']);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.isFormSubmittedWithErrors = true;
          this.isFormSubmitted = true;
        },
      });
  }
}
