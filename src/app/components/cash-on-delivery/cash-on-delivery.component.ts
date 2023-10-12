import { ShippingAddress } from './../../interfaces/orders';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from 'src/app/interfaces/orders';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cash-on-delivery',
  templateUrl: './cash-on-delivery.component.html',
  styleUrls: ['./cash-on-delivery.component.css'],
})
export class CashOnDeliveryComponent {
  userId = this._ActivatedRoute.snapshot.params?.['id'];

  cartData!: any;
  constructor(
    private _cartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {
    // this._cartService.usertId.next(this.userId)
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
