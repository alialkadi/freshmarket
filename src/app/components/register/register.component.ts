import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isLoading: boolean = true;
  errorMessage: string = ""
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z0-9]+$/),
    ]),

    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  register(registerForm: FormGroup) {
    this.isLoading = false;
    this._AuthenticationService.register(registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = true;
        if (res.message == 'success')
            this._Router.navigate(['login'])
      },
      error: (err) => {},
    });
  }
  matching(password: string, rePassword: string): boolean {
    if (password == rePassword) {
      return true;
    } else {
      return false;
    }
  }
}
