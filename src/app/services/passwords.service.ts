import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordsService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL = 'https://ecommerce.routemisr.com/api/v1/auth/';
  forgetpassword(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'forgotPasswords', data);
  }
  verfiyResetCode(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'verifyResetCode', data);
  }
  verfiyResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      data
    );
  }
}
