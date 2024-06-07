import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FollowersComponent } from '../followers/followers.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

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
export class FollowersContainerComponent {
  followingList = [
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'John Doe',
      postedProducts: 10,
      isFollowing: false
    },
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      postedProducts: 8,
      isFollowing: true
    },
    // Add more sample following
  ];

  followersList = [
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'Alice Johnson',
      postedProducts: 12,
      isFollowing: true
    },
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'Bob Brown',
      postedProducts: 5,
      isFollowing: false
    },
    // Add more sample followers
  ];

  constructor() {}

  ngOnInit(): void {}
}
