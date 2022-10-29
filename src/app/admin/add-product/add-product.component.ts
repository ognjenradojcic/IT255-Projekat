import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { linkValidator } from 'src/app/shared/validator/email-validator.directive';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  id: number;
  products: any[];
  product: Product;

  addForm: FormGroup
  name: AbstractControl;
  description: AbstractControl;
  image: AbstractControl;
  category: AbstractControl;
  price: AbstractControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private fbservice: FirebaseService, private store: Store, private router: Router) {
    route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      'name': ['', Validators.required], 
      'description': ['', Validators.required], 
      'image': ['', linkValidator],
      'category': ['', Validators.required], 
      'price': ['', Validators.required] 
    })

    this.name = this.addForm.controls['name'];
    this.description = this.addForm.controls['description'];
    this.image = this.addForm.controls['image'];
    this.category = this.addForm.controls['category'];
    this.price = this.addForm.controls['price'];

  }

  onSubmit(){
    if(!this.addForm.valid){
      return;
    }
    this.product = new Product(this.name.value, this.description.value, this.image.value, this.category.value, this.price.value);

    this.fbservice.addProduct(Object.assign({}, this.product));
    this.router.navigate(['/products']);
  }

}
