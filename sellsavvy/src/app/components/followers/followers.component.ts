import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

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
  @Input() followers: any = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleFollow(follower: any): void {
    follower.isFollowing = !follower.isFollowing;
  }

  viewProfile(id: string) {
    this.router.navigate(['user', id]);
  }
}
