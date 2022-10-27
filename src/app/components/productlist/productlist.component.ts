import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any[];
  @HostBinding('class') classes = "mt-3 container";
  searchText: string;
  constructor(private fbservice: FirebaseService, private router: Router) { 
    this.searchText = "";
  }


  ngOnInit(): void {
    this.fbservice.getProducts().subscribe((item) => {
      console.log(item)
      if (item.length > 0) {
        this.products = item;
      }
    })
  }

  seeDetails(index: number){
    this.router.navigate(['/products/', index]);
  }
}
