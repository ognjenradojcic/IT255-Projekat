import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { linkValidator } from 'src/app/shared/validator/email-validator.directive';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: number;
  products: any[];
  product: Product;

  editForm: FormGroup
  name: AbstractControl;
  description: AbstractControl;
  image: AbstractControl;
  category: AbstractControl;
  price: AbstractControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private fbservice: FirebaseService, private store: Store, private router: Router) {
    route.params.subscribe(params => this.id = params['id']);

  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'image': ['', linkValidator],
      'category': ['', Validators.required],
      'price': ['', Validators.required]
    })

    this.name = this.editForm.controls['name'];
    this.description = this.editForm.controls['description'];
    this.image = this.editForm.controls['image'];
    this.category = this.editForm.controls['category'];
    this.price = this.editForm.controls['price'];

    this.fbservice.getProducts().subscribe((item) => {
      if (item.length > 0) {
        this.products = item;
        this.product = this.products[this.id];
        
        this.name.setValue(this.product.name);
        this.description.setValue(this.product.description);
        this.image.setValue(this.product.image);
        this.category.setValue(this.product.category);
        this.price.setValue(this.product.price);

      }
    })

  }

  onSubmit() {
    if (!this.editForm.valid) {
      return;
    }

    this.product.name = this.name.value;
    this.product.description = this.description.value;
    this.product.image = this.image.value;
    this.product.category = this.category.value;
    this.product.price = this.price.value;

    this.fbservice.updateProduct(this.product);
    this.router.navigate(['/products/', this.id]);
  }

}
