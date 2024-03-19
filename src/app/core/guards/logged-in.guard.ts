import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  
  if(!_authService.isLoggedIn()){
    return true
  } else{
    _router.navigate(['/Home']);
    return false;
  }
  
};
