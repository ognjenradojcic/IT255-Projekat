import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  isLogged: boolean;
  items: Observable<any[]>;
  isAdmin = false;

  constructor( private fbservice: FirebaseService, private auth: AuthService, private router: Router) {
  }

  ngDoCheck(): void {
    this.isLogged = this.auth.isUserLogged();
    this.isAdmin = this.auth.isAdmin();
  }

  ngOnInit(): void {  
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }
}
