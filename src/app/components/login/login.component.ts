import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { emailValidator } from 'src/app/shared/validator/email-validator.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required]
    })
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  login(){
    if(!this.loginForm.valid){
      return;
    }
    const email = this.email.value
    const password = this.password.value

    this.auth.login(email, password);

  }

}
