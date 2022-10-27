import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): boolean{
    if(!this.auth.isUserLogged() || !this.auth.isAdmin){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
