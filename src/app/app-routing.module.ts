import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CashOnDeliveryComponent } from './components/cash-on-delivery/cash-on-delivery.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { authGuard } from './auth.guard';
import { SpecificcategoryComponent } from './components/specificcategory/specificcategory.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { UpdatepasswordComponent } from './components/updatepassword/updatepassword.component';
import { UpdateuserinfoComponent } from './components/updateuserinfo/updateuserinfo.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
  },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    component: SpecificProductComponent,
  },
  {
    path: 'specificategory/:id',
    canActivate: [authGuard],
    component: SpecificcategoryComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent },
  { path: 'userInfo', canActivate: [authGuard], component: UserInfoComponent },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
  },
  {
    path: 'updatepassword',
    canActivate: [authGuard],
    component: UpdatepasswordComponent,
  },
  {
    path: 'updatedata',
    canActivate: [authGuard],
    component: UpdateuserinfoComponent,
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
  },
  {
    path: 'checkout/:id',
    canActivate: [authGuard],
    component: CheckoutComponent,
  },
  {
    path: 'orders/:id',
    canActivate: [authGuard],
    component: CashOnDeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
