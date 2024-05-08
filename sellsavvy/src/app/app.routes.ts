import { Routes } from '@angular/router';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ArticlesPageComponent } from './pages/articles-page/articles-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authorizationGuard } from './guards/authorization.guard';
import { ArticleFormPageComponent } from './pages/article-form-page/article-form-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { FailPageComponent } from './pages/fail-page/fail-page.component';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'update-profile',
    component: ProfileFormComponent,
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
    path: 'shop',
    component: ArticlesPageComponent,
  },
  {
    path: 'view-article/:id',
    component: ArticlePageComponent,
  },
  {
    path: 'article-create',
    component: ArticleFormPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'article-update/:id',
    component: ArticleFormPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'success',
    component: SuccessPageComponent,
  },
  {
    path: 'fail',
    component: FailPageComponent,
  },
  {
    path: '**',
    component: UnauthorizedPageComponent,
    pathMatch: 'full',
  },
];
