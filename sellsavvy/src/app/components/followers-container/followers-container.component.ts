import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FollowersComponent } from '../followers/followers.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { forkJoin, switchMap } from 'rxjs';
import { UsersService } from '../../services/apis/users.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDTO } from '../../models/dtos/user.model';
import UserFollow from '../../models/dtos/user-follow.model';

@Component({
  selector: 'followers-container',
  standalone: true,
  templateUrl: './followers-container.component.html',
  styleUrl: './followers-container.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    FollowersComponent,
    FlexLayoutModule,
  ],
})
export class FollowersContainerComponent implements OnInit {
  followingList: Array<UserFollow> = [];
  followersList: Array<UserFollow> = [];

  constructor(
    private usersService: UsersService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService
      .getProfile()
      .pipe(
        switchMap((user) => {
          const followers$ = this.usersService.getFollowers({
            followeeId: user.id,
          });
          const followees$ = this.usersService.getFollowees({
            followerId: user.id,
          });
          return forkJoin([followers$, followees$]);
        })
      )
      .subscribe(
        ([followers, followees]) => {
          this.followersList = followers;
          this.followingList = followees;
        },
        (error) => {
          console.error('Error fetching followers or followees', error);
        }
      );
  }

  getFollowers(): UserDTO[] {
    return this.followersList.map((follow) => follow.follower);
  }

  getFollowees(): UserDTO[] {
    return this.followingList.map((follow) => follow.followee);
  }
}
