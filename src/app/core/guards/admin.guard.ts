import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Role } from '../../features/auth/models/role';


// const currentUser = JSON.stringify(localStorage.getItem('currentUser'));

export const adminGuard: CanActivateFn = (route, state) => {

  const _authService = inject(AuthService);
  const _router = inject(Router);

  if(_authService.isLoggedIn()){
    if(_authService.getUserData().role == Role.Admin){
      return true;
    } else if(_authService.getUserData().role == Role.User){
      _router.navigate(['/products']);
      return true;
    } 
    else {
      debugger
      _router.navigate(['/auth']);
      return false;
    }
  } else {
    debugger
    _router.navigate(['/auth']);
    return false;
  }
  
  

  
  
};
