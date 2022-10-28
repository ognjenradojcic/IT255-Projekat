import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { emailValidator } from 'src/app/shared/validator/email-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  adress: AbstractControl;
  phone: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'adress': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required]
    })

    this.firstName = this.registerForm.controls['firstName'];
    this.lastName = this.registerForm.controls['lastName'];
    this.adress = this.registerForm.controls['adress'];
    this.phone = this.registerForm.controls['phone'];
    this.email = this.registerForm.controls['email'];
    this.password = this.registerForm.controls['password'];
  }

  register(){
    if(!this.registerForm.valid){
      return;
    }
    console.log("hello!")
    
    const firstName = this.firstName.value
    const lastName = this.lastName.value
    const adress = this.adress.value
    const phone = this.phone.value
    const email = this.email.value
    const password = this.password.value

    this.auth.register(firstName, lastName, adress, phone, email, password);

  }
}
