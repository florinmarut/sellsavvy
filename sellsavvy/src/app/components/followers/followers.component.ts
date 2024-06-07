import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'followers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnInit {
  @Input() followers = [
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'John Doe',
      postedProducts: 10,
      isFollowing: false,
    },
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      postedProducts: 8,
      isFollowing: true,
    },
    // Add more sample followers as needed
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleFollow(follower: any): void {
    follower.isFollowing = !follower.isFollowing;
  }
}
