import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/apis/users.service';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterForm implements OnInit {
  registerForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _userService: UsersService) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required]],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const user = this.registerForm.value;
    this._userService.createUser(user);
  }
}
