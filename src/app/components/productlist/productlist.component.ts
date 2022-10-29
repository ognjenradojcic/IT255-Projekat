import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any[];
  isAdmin: boolean;
  @HostBinding('class') classes = "mt-3 container";
  searchText: string;
  constructor(private auth: AuthService, private fbservice: FirebaseService, private router: Router) { 
    this.searchText = "";
    this.isAdmin = this.auth.isAdmin();
  }


  ngOnInit(): void {
    this.fbservice.getProducts().subscribe((item) => {
      if (item.length > 0) {
        this.products = item;
      }
    })
  }

  seeDetails(index: number){
    this.router.navigate(['/products/', index]);
  }

  edit(index: number){
    this.router.navigate(['/edit/', index]);
  }

  delete(product: Product){
    this.fbservice.deleteProduct(product.id);
  }
}
