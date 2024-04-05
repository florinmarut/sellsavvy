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
import { AuthenticationService } from '../../../services/authentication.service';
import { ArticlesService } from '../../../services/apis/articles.service';

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
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _articlesService: ArticlesService
  ) {}
  ngOnInit(): void {
    this.loginGroup = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getArticles() {
    this._articlesService.getArticles().subscribe({
      next: (value) => {
        console.warn('Getting articles: ', value);
        debugger;
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit(): void {
    this._authService
      .login(this.loginGroup.value, { useCookies: true })
      .subscribe({
        next: (value) => {
          console.warn('Login next value is: ' + value);
          //debugger
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}