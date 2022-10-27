import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userLogin, userLogout } from 'src/app/store/user/user.actions';

import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(private fireauth: AngularFireAuth, private router: Router, private store: Store, private database: FirebaseService) {
    this.user = fireauth.authState;
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  isAdmin(): boolean {
    return localStorage.getItem('username') === 'ogiradojcic@gmail.com';
  }

  isUserLogged(): boolean {
    return this.getUserId() ? true : false;
  }
  
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(value => {
      localStorage.setItem('userId', value.user!.uid);
      localStorage.setItem('username', value.user!.email);
      let user = {
        uid: value.user!.uid,
        username: value.user!.email
      }
      this.store.dispatch(userLogin({ user: user }));
      this.router.navigate(['home']);
      return true;
    }, err => {
      alert(err.message);
    })
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(value => {
      this.router.navigate(['/login']);
      this.database.addUser(value.user!.uid, email);
      return true;
    }, err => {
      alert(err.message);
      return false;
    })
  }

  logout() {
    this.fireauth.signOut();
    this.store.dispatch(userLogout());
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }
}
