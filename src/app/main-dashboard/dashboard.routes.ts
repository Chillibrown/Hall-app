import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-dashboard.component').then(m => m.MainDashboardComponent),
    canActivate: [authGuard],  // ensure dashboard base also guarded
    children: [
      { 
        path: '', 
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
      },
      { 
        path: 'manage-hall', 
        loadComponent: () => import('./components/hall-list/hall-list.component').then(m => m.HallListComponent),
        data: { roles: ['ADMIN'] } // only admin can access
      },
      { 
        path: 'booking-list', 
        loadComponent: () => import('./components/booking-list.component').then(m => m.BookingListComponent),
        data: { roles: ['ADMIN', 'USER'] } // both roles can access
      },
      { 
        path: 'users', 
        loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent),
        data: { roles: ['ADMIN'] } // only admin can access
      },
      { 
        path: 'hall-booking', 
        loadComponent: () => import('../components/hall-booking/hall-booking.component').then(m => m.HallBookingComponent),
        data: { roles: ['USER'] } // only normal user can access
      },
    ]
  }
];
