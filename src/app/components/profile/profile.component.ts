import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { getUser } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  id: string;
  subscription: Subscription = new Subscription;
  user: any;
  constructor(private fbservice: FirebaseService, private store: Store, private router: Router) { }
  
  ngOnInit()  {
    this.subscription = this.store.pipe(select(getUser)).subscribe((item) => {
      this.fbservice.getUser(item.uid).pipe(map(item => {
        this.user = item;
      })).subscribe()
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  edit(){
    this.router.navigate(['/editprofile'])
  }

}
