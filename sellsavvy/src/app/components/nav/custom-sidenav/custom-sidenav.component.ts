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
import {
  Subject,
  catchError,
  map,
  of,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { UserDTO } from '../../../models/dtos/user.model';

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
  user: UserDTO | null | undefined;

  constructor(private readonly _authService: AuthenticationService) {}

  sidenavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }
  menuItems = signal<MenuItem[]>(MENU_ITEMS);
  profilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));

  ngOnInit(): void {
    this._authService.isLoggedIn
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => throwError(() => err)),
        map((isUserLoggedIn) => isUserLoggedIn),
        switchMap((isUserLoggedIn) =>
          isUserLoggedIn ? this._authService.getProfile() : of(null)
        )
      )
      .subscribe({
        next: (user: UserDTO | null) => {
          let ITEMS: MenuItem[] = [];
          this.user = user;
          if (user) {
            ITEMS = MENU_ITEMS;
          } else {
            ITEMS = MENU_ITEMS_GUEST;
          }

          this.menuItems.set(ITEMS);
        },
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
