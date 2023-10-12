import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  username: any;
  userData: any;
  usertoken: any;
  numOfItems: any = 0;
  numOfWishedItems: any = 0;
  loggedIn: boolean = false;
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CartService: CartService,
    private _wishService: WishlistService
  ) {
    this._wishService.itemsCountInWishList.subscribe((val) => {
      this.numOfWishedItems = val;
    });
    this._CartService.itemsCountInCart.subscribe((val) => {
      this.numOfItems = val;
    });
    this._AuthenticationService.isLoggedIn.subscribe((val) => {
      this.userData = localStorage.getItem('token');
      this.usertoken = jwtDecode(this.userData);
      console.log(this.usertoken.name);
      console.log(this.usertoken);
      console.log(val);
      this.username = this.usertoken.name;
      this.loggedIn = val;
    });
  }
  logout() {
    this._AuthenticationService.logOut();
    this.username = '';
  }
  ngOnInit() {}
}
