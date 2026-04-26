import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { CategoriesPageComponent } from './pages/categories-page.component';
import { AssignmentsPageComponent } from './pages/assignments-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: DashboardPageComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesPageComponent, canActivate: [authGuard] },
  { path: 'assignments', component: AssignmentsPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
