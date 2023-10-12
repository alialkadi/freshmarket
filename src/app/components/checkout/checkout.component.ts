import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  data: any;
  constructor(
    private _cartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  getAddressForm = new FormGroup({
    details: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });
  cartId = this._ActivatedRoute.snapshot.params?.['id'];
  checkOutUrl(url: any) {
    location.href = url;
  }
  checkout(form: any) {
    if (form.valid) {
      this._cartService.onlinePayment(this.cartId, form.value).subscribe({
        next: (responce) => {
          console.log(responce);
          // console.log(responce.session.url);
          this.checkOutUrl(responce.session.url);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  cashDelivery(form: any) {
    if (form.valid) {
      this._cartService.cashPayment(this.cartId, form.value).subscribe({
        next: (responce) => {
          console.log(responce);

          this.data = responce.data.user;

          this._Router.navigate(['/orders', responce.data.user]);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
