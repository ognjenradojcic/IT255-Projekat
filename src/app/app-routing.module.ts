import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminAuthGuardService } from './shared/services/admin-auth-guard.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductlistComponent},
  {path: 'products/:id', component: ProductComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'edit/:id', component: EditProductComponent, canActivate:[AdminAuthGuardService]},
  {path: 'orders', component: OrdersComponent, canActivate:[AuthGuardService]},
  {path: '**', component: NotfoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
