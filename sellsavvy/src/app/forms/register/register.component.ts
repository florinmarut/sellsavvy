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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/apis/users.service';
import { validatePassword } from '../../models/validators';
import { SuccessCardComponent } from '../../components/success-card/success-card.component';
import { FailCardComponent } from '../../components/fail-card/fail-card.component';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SuccessCardComponent,
    FailCardComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterForm implements OnInit {
  registerForm!: FormGroup;
  isFormSubmitted = false;
  isFormSubmittedWithErrors = false;

  get email() {
    return this.registerForm.get('email');
  }

  get confirmEmail() {
    return this.registerForm.get('confirmEmail');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UsersService
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator()]],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: [
        '',
        [Validators.required, Validators.email, this.confirmEmailValidator()],
      ],
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: [
        '',
        [
          Validators.required,
          this.passwordValidator(),
          this.confirmPasswordValidator(),
        ],
      ],
    });
  }

  confirmEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const emailControl = control.parent?.get('email');

      return emailControl && emailControl.value !== value
        ? { emailNotMatching: true }
        : null;
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const passwordControl = control.parent?.get('password');

      return passwordControl && passwordControl.value !== value
        ? { passwordNotMatching: true }
        : null;
    };
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid = false;
      if (control.value) {
        const romanianPhoneNumberRegex = /^(?:\+?40)?[07]\d{8}$/;
        isValid = romanianPhoneNumberRegex.test(control.value);
      }

      return isValid ? null : { invalidPhoneNumber: true };
    };
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
    const user = this.registerForm.value;
    this._userService.createUser(user).subscribe({
      next: (value) => {
        this.isFormSubmittedWithErrors = false;
        this.isFormSubmitted = true;
      },
      error: (err) => {
        console.error(err);
        this.isFormSubmittedWithErrors = true;
        this.isFormSubmitted = true;
      },
    });
  }
}
