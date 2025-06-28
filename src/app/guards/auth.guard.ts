import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  try {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const isLoggedIn = !!token;
    if (!isLoggedIn) {
      alert('Please login to access this page.');
      window.location.href = '/login';
      return false;
    }

    // Check if route defines allowed roles
    const allowedRoles: string[] | undefined = route.data?.['roles'];
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      alert('Access denied. You do not have permission to view this page.');
      window.location.href = '/unauthorized';
      return false;
    }

    return true;

  } catch (e) {
    return false;
  }
};
