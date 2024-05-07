import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { SingleFileUploadComponent } from '../../components/single-file-upload/single-file-upload.component';
import { Subject, takeUntil } from 'rxjs';
import { UserDTO } from '../../models/dtos/user.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [MatButtonModule, SingleFileUploadComponent],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  
  user: UserDTO | undefined;

  constructor(private readonly authService: AuthenticationService) {}

  ngOnInit() {
    this.authService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: UserDTO) => {
          console.log(`The user is ${user.email}`);
          this.user = user;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
