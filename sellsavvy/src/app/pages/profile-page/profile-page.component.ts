import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  constructor(private readonly authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe((value) => {
      console.log('User is: ' + value.email);
    });
  }
}
