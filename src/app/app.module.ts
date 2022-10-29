import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { FilterPipe } from './shared/helpers/filter.pipe';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductComponent } from './components/product/product.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { orderReducer } from './store/order/order.reducer';
import { loginReducer } from './store/user/user.reducer';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './shared/services/firebase.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotfoundComponent,
    ProductComponent,
    ProductlistComponent,
    ProfileComponent,
    RegisterComponent,
    AddProductComponent,
    EditProductComponent,
    OrdersComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    NgbModule,
    StoreModule.forRoot({
      order: orderReducer,
      user: loginReducer
    }),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
