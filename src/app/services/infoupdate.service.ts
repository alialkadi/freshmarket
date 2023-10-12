import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoupdateService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL = 'https://ecommerce.routemisr.com/api/v1/users/';
  updatepassword(data: any): Observable<any> {
    return this._HttpClient.put(this.baseURL + 'changeMyPassword', data);
  }
  updateInfo(data: any): Observable<any> {
    return this._HttpClient.put(this.baseURL + 'updateMe', data);
  }
}
