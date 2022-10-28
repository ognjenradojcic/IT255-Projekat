import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { getUser } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[];
  currentUser: User;
  subscription: Subscription;
  @HostBinding('class') classes = "mt-3 container";
  constructor(private fbservice: FirebaseService, private store: Store, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.store.pipe(select(getUser)).subscribe((item) => {
      this.fbservice.getUser(item.uid).pipe(map(item => {
        this.currentUser = item;
        this.orders = this.fbservice.getOrderByUser(this.currentUser)
      })).subscribe()
    })
  }

  delete(order: Order){
    this.fbservice.deleteOrder(order.id);
  }

}
