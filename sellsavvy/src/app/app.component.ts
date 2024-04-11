import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './forms/register/register.component';
import { LoginForm } from './forms/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterForm, LoginForm],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sellsavvy';

  constructor() {}
}
