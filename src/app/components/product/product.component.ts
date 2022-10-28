import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { addItem } from 'src/app/store/order/order.actions';
import { getUser } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: number;
  product: Product;
  products: any[];
  uid: string;
  currentUser: User;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private fbservice: FirebaseService, private store: Store, private auth: AuthService) {
    route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.fbservice.getProducts().subscribe((item) => {
      if (item.length > 0) {
        this.products = item;
        this.product = this.products[this.id];
      }
    })
    this.subscription = this.store.pipe(select(getUser)).subscribe((item) => {
      console.log(item);
      this.fbservice.getUser(item.uid).pipe(map(item => {
        console.log(item)
        this.currentUser = item;
      })).subscribe()
    })
  }



  makeOrder() {
    let quantity: number;
    quantity = parseInt(prompt('Enter the quantity:', '1'));
    if (isNaN(quantity)) {
      alert('Invalid input')
      return;
    }
    let order = new Order(this.product, quantity, this.currentUser);

    this.store.dispatch(addItem({ order: order}));
    this.fbservice.addOrder(Object.assign({}, order));
    
  }


}
