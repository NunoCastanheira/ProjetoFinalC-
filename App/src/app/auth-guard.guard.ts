
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


export const authGuardGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).getAuthToken()){
    return true;
  }else{
    inject(Router).navigateByUrl("");
    return false;
  }
  
};