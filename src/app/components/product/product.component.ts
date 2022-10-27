import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/shared/models/cart-item.model';
import { Product } from 'src/app/shared/models/product.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { addItem } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: number;
  product: Product;
  products: any[];
  constructor(private route: ActivatedRoute, private fbservice: FirebaseService, private store: Store) {
    route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.fbservice.getProducts().subscribe((item) => {
      if (item.length > 0) {
        this.products = item;
        this.product = this.products[this.id];
      }
    })
  }

  addToCart() {
    let quantity: number;
    quantity = parseInt(prompt('Enter the quantity:', '1'));
    if (isNaN(quantity)) {
      alert('Invalid input')
      return;
    }
    this.store.dispatch(addItem({ cartItem: new CartItem(this.product, quantity) }));
  }


}
