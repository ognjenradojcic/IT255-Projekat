import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
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
  constructor(private db: AngularFireDatabase, private fbservice: FirebaseService, private store: Store, private router: Router) {

  }

  ngOnInit(): void {
    this.fbservice.getCategories().subscribe((item) => {
      this.items = item;
      this.firstCategory = this.items[0];
      this.disabled = false;
    })

    this.fbservice.getProducts().subscribe(items => {
      this.products = items;
    })
  }

  addCategory() {

  }

  goTo(key: string) {
    console.log(key);
    this.router.navigate(['/category', key]);
  }

}
