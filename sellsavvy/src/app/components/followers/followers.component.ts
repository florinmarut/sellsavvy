import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'followers',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, FlexLayoutModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnInit {
  followers = [
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'John Doe',
      postedProducts: 10,
    },
    {
      profilePicture: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      postedProducts: 8,
    },
    // Add more sample followers as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
