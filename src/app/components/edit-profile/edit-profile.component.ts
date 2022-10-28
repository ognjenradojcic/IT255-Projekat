import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { emailValidator } from 'src/app/shared/validator/email-validator.directive';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  id: string;

  editForm: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  adress: AbstractControl;
  phone: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private auth: AuthService, private fb: FormBuilder, private fbService: FirebaseService, private router: Router) {
      this.id = auth.getUserId();
   }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'adress': ['', Validators.required],
      'phone': ['', Validators.required],
    })

    this.firstName = this.editForm.controls['firstName'];
    this.lastName = this.editForm.controls['lastName'];
    this.adress = this.editForm.controls['adress'];
    this.phone = this.editForm.controls['phone'];

    this.fbService.getUser(this.id).subscribe((item) => {
      this.user = item;
      
      this.firstName.setValue(this.user.firstname)
      this.lastName.setValue(this.user.lastname)
      this.adress.setValue(this.user.adress)
      this.phone.setValue(this.user.phone)
    })

  }

  edit(){
    if(!this.editForm.valid){
      return;
    }
    console.log("hello!")
    
    this.user.firstname = this.firstName.value;
    this.user.lastname = this.lastName.value;
    this.user.adress = this.adress.value;
    this.user.phone = this.phone.value;
    console.log(this.user)

    this.fbService.updateUser(this.user);
    this.router.navigate(['/profile'])

  }
}
