import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  getProducts(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(
      Environment.baseURL + `products?page=${pageNum}`
    );
  }
  getSpecificProduct(id: any): Observable<any> {
    return this._HttpClient.get(Environment.baseURL + 'products/' + id);
  }
}
