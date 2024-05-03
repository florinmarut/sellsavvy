import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MENU_ITEMS } from '../../models/constants.const';
import { MenuItem } from '../../models/navigation.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'custom-sidenav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent {
  sidenavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }
  menuItems = signal<MenuItem[]>(MENU_ITEMS);
  profilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));
}
