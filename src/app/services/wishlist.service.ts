import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  itemsCountInWishList = new BehaviorSubject(0);
  itemColor = new BehaviorSubject('');

  constructor(private _httpClient: HttpClient) {}
  addProductToWish(id: any): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: id,
      }
    );
  }
  getWishList(): Observable<any> {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }
  removeFromWishList(id: any): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }
}
