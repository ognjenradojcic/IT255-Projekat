import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { getUser } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscription: Subscription;
  user: any;
  constructor(private fbservice: FirebaseService, private store: Store) { }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select(getUser)).subscribe((item) => {
      this.fbservice.getUser().pipe(map(item => {
        this.user = item;
      })).subscribe()
    })
  }

}
