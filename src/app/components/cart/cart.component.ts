import { Router } from '@angular/router';
import { product } from './../../interfaces/allproducts';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any;
  totalPrice: any = 0;
  emptyMessage: boolean = true;
  cartId: any;
  isLoading: boolean = false;
  constructor(
    private _CartService: CartService,
    private toastrService: ToastrService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this._CartService.itemsCountInCart.next(res.numOfCartItems);
        this.cartData = res.data.products;
        console.log(this.cartData);

        this.cartId = res.data._id;
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
      },
      error: (err) => {
        console.log(err.error.message);
        if (err.statusText === 'Not Found') {
          // this._Router.navigate(['/home']);
          this.emptyMessage = false;
          this.cartData = [];
          console.log('yakhteeeeeeeee');
        }
      },
    });
  }

  removeFromCart(id: any) {
    this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this._CartService.itemsCountInCart.next(res.itemOfCartItems);
        this.cartData = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.toastrService.error('item Deleted');
        console.log(res);
        if (res.data.products.length === 0) {
          this.emptyMessage = false;
          this.cartData = [];
          console.log('yakhteeeeeeeee');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeAllItems() {
    this._CartService.removeAllCartItems().subscribe({
      next: (responce) => {
        if (responce.message == 'success') {
          this.emptyMessage = false;
          this._CartService.itemsCountInCart.next(0);
          this.cartData = [];
          this.totalPrice = 0;
          this.toastrService.error('Cart Empty');
          console.log(responce);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateCountItem(id: any, count: any) {
    if (count >= 0) {
      this._CartService.updateCountItem(id, count).subscribe({
        next: (responce) => {
          this.toastrService.success('item changed');
          this.totalPrice = responce.data.totalCartPrice;
          this.cartData = responce.data.products;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.removeFromCart(id);
    }
  }
}
