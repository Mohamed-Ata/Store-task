import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Role } from '../../features/auth/models/role';


// const currentUser = JSON.stringify(localStorage.getItem('currentUser'));

export const authGuard: CanActivateFn = (route, state) => {

  const _authService = inject(AuthService);
  const _router = inject(Router);
  
  if(_authService.isLoggedIn()){
    if(_authService.getUserData().role == Role.Admin || _authService.getUserData().role == Role.User){
      return true;
    }
  
    else {
      _router.navigate(['/auth']);
      return false;
    }
  } else {
    _router.navigate(['/auth']);
      return false;
  }
  
};
