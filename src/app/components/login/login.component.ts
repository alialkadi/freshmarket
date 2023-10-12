import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading: boolean = false;
  forgot: boolean = false;
  errmesage: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
  });
  login(form: any) {
    this.isLoading = true;

    console.log('this is form login', form);
    if (form.invalid) {
      this.isLoading = false;
    }
    if (form.valid) {
      this._AuthenticationService.login(form.value).subscribe({
        next: (value) => {
          console.log(value);
          this.isLoading = false;
          this.errmesage = value.message;
          // this._AuthenticationService.isLoggedIn = true;
          localStorage.setItem('token', value.token);
          this._AuthenticationService.isLoggedIn.next(true);
          this._Router.navigate(['/home']);
          // console.log(localStorage.getItem('token'))
        },
        error: (err) => {
          console.log(err);
          this.forgot = true;
          this._ToastrService.error(err.error.message);
          this.errmesage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
