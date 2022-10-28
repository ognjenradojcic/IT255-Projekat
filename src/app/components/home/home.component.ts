import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[];
  items: any[];
  firstCategory: any;
  disabled = true;
  constructor(private fbservice: FirebaseService, private store: Store, private router: Router) {

  }

  ngOnInit(): void {
  }
}
