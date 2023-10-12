import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlidersCategoriesComponent } from './components/sliders-categories/sliders-categories.component';
import { SliderHomeComponent } from './components/slider-home/slider-home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptor } from './headers.interceptor';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CashOnDeliveryComponent } from './components/cash-on-delivery/cash-on-delivery.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SpecificcategoryComponent } from './components/specificcategory/specificcategory.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { UpdatepasswordComponent } from './components/updatepassword/updatepassword.component';
import { UpdateuserinfoComponent } from './components/updateuserinfo/updateuserinfo.component';
import { SearchPipe } from './pipes/search.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    SpecificProductComponent,
    NavBarComponent,
    NotfoundComponent,
    SlidersCategoriesComponent,
    SliderHomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    WishlistComponent,
    CashOnDeliveryComponent,
    AllordersComponent,
    SpecificcategoryComponent,
    ForgetpasswordComponent,
    UpdatepasswordComponent,
    UpdateuserinfoComponent,
    SearchPipe,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxNavbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
