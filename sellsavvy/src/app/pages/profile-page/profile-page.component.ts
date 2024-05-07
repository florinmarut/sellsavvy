import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { SingleFileUploadComponent } from "../../components/single-file-upload/single-file-upload.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
    imports: [MatButtonModule, SingleFileUploadComponent]
})
export class ProfilePageComponent implements OnInit {
  constructor(private readonly authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe((value) => {
      console.log('User is: ' + value.email);
    });
  }
}
