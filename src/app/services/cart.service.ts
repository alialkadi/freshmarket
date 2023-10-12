import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsCountInCart = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {}

  token: any;
  addproduct(id: string): Observable<any> {
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
    }
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      }
    );
  }
  getCartProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  removeCartItem(id: any): Observable<any> {
    let headers: any = {
      token: localStorage.getItem('token'),
    };
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }
  removeAllCartItems(): Observable<any> {
    let headers: any = {
      token: localStorage.getItem('token'),
    };
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
    );
  }

  updateCountItem(id: any, count: any): Observable<any> {
    let headers: any = {
      token: localStorage.getItem('token'),
    };
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      }
    );
  }
  onlinePayment(id: any, address: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: address }
    );
  }
  cashPayment(id: any, address: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      {
        shippingAddress: address,
      }
    );
  }
  getAllOrders(id: any): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }
}
