import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { ArticlesService } from '../../services/apis/articles.service';
import { UsersService } from '../../services/apis/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginForm implements OnInit {
  loginGroup!: FormGroup;
  displayError = false;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router
  ) {}
  ngOnInit(): void {
    this.loginGroup = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this._authService
      .login(this.loginGroup.value, { useCookies: false })
      .subscribe({
        next: (value) => {
          this._router.navigate(['']);
        },
        error: (err) => {
          this.displayError = true;
          console.error(err);
        },
      });
  }
}
