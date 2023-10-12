import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Orders } from 'src/app/interfaces/orders';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent {
  userId: any;
  userData: any;
  usertoken: any;
  cartData: Orders[] = [];
  constructor(
    private _cartService: CartService,
    private _AuthenticationService: AuthenticationService
  ) {
    this._AuthenticationService.isLoggedIn.subscribe((val) => {
      this.userData = localStorage.getItem('token');
      this.usertoken = jwtDecode(this.userData);
      console.log(this.usertoken.id);
      console.log(this.usertoken);
      this.userId = this.usertoken.id;
    });
    this._cartService.getAllOrders(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res;
        console.log(this.cartData);
        // console.log(res.ShippingAddress[0].city);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
