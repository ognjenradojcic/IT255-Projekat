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
  email: AbstractControl;
  password: AbstractControl;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required]
    })

    this.email = this.registerForm.controls['email'];
    this.password = this.registerForm.controls['password'];
  }

  register(){
    if(!this.registerForm.valid){
      return;
    }
    console.log("hello!")
    const email = this.email.value
    const password = this.password.value

    this.auth.register(email, password);

  }
}
