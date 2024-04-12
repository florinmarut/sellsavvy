import { Routes } from '@angular/router';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ArticlesPageComponent } from './pages/articles-page/articles-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authorizationGuard } from './guards/authorization.guard';
import { ArticleFormPageComponent } from './pages/article-form-page/article-form-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'articles',
    component: ArticlesPageComponent,
  },
  {
    path: 'article-form',
    component: ArticleFormPageComponent,
  },
  {
    path: '**',
    component: UnauthorizedPageComponent,
    pathMatch: 'full',
  },
];
