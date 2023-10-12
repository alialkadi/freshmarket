import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserinfoService {
  constructor(private _HttpClient: HttpClient) {}
  getUserAddress(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/addresses'
    );
  }
  addAddress(data: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/addresses',
      data
    );
  }
  removeAddress(id: any): Observable<any> {
    return this._HttpClient.delete(
      ` https://ecommerce.routemisr.com/api/v1/addresses/${id}`
    );
  }
}
