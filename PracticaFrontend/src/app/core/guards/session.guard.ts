import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const SessionGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);

  try {
    const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
    
    if (token === null || token === undefined) {
      router.navigate(['/', 'auth']);
      return false;
    }
      return true;
  } catch (e) {
    console.log('Error de sesion');
    return false;
  }
};
