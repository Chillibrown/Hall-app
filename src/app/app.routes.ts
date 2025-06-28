import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./main-dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];