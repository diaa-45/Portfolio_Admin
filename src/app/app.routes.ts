import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
    ...AUTH_ROUTES,
    {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: DASHBOARD_ROUTES
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
