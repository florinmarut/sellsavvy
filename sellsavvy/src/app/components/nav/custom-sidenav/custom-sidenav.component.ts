import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MENU_ITEMS, MENU_ITEMS_GUEST } from '../../../models/constants.const';
import { MenuItem } from '../../../models/navigation.model';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subject } from 'rxjs';

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
export class CustomSidenavComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(private readonly _authService: AuthenticationService) {}

  sidenavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }
  menuItems = signal<MenuItem[]>(MENU_ITEMS);
  profilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));

  ngOnInit(): void {
    this._authService.isLoggedIn.subscribe({
      next: (isAuthenticated) => {
        this.menuItems.set(isAuthenticated ? MENU_ITEMS : MENU_ITEMS_GUEST);
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
