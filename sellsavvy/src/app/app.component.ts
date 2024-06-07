import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './forms/register/register.component';
import { LoginForm } from './forms/login/login.component';
import { NavigationComponent } from './components/nav/navigation/navigation.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RegisterForm, LoginForm, NavigationComponent]
})
export class AppComponent {
  title = 'sellsavvy';

  constructor() {}
}
