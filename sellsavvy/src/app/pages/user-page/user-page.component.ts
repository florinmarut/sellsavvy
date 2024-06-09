import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserDTO } from '../../models/dtos/user.model';
import { UsersService } from '../../services/apis/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  user!: UserDTO;
  isFollowing: boolean = false;
  showProducts: boolean = false;
  loggedInUserId!: string;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((loggedInUser: UserDTO) => {
      this.loggedInUserId = loggedInUser.id;
      this.loadUserProfile();
    });
  }

  loadUserProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Get user ID from route params
    if (userId) {
      this.usersService.getUser(userId).subscribe((user: UserDTO) => {
        this.user = user;
        // Check if the logged-in user is following this user
        this.checkIfFollowing();
      });
    }
  }

  toggleFollow(): void {
    if (this.isFollowing) {
      this.unfollowUser();
    } else {
      this.followUser();
    }
  }

  followUser(): void {
    this.usersService
      .followUser({ followeeId: this.user.id, followerId: this.loggedInUserId })
      .subscribe(() => {
        this.isFollowing = true;
      });
  }

  unfollowUser(): void {
    this.usersService
      .unfollowUser({
        followeeId: this.user.id,
        followerId: this.loggedInUserId,
      })
      .subscribe(() => {
        this.isFollowing = false;
      });
  }

  checkIfFollowing(): void {
    this.usersService
      .getFollowers({ followeeId: this.user.id })
      .subscribe((followers: any[]) => {
        this.isFollowing = followers.some(
          (follower) => follower.id === this.loggedInUserId
        );
      });
  }

  toggleProductVisibility(): void {
    this.showProducts = !this.showProducts;
  }

  viewProduct(id: string) {
    this.router.navigate(['view-product', id]);
  }
}
