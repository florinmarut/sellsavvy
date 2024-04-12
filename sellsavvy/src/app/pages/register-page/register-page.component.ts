import { Component } from '@angular/core';
import { RegisterForm } from '../../forms/register/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterForm],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {}
