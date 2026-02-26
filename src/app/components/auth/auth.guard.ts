import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigateByUrl('/dashboard');
  return false;
};

/* Route Protection: Auth guards allow developers to protect routes by restricting 
access based on certain conditions, such as user authentication status, user roles, or other 
application-specific logic. */
