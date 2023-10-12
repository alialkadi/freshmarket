import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordsService } from 'src/app/services/passwords.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  constructor(
    private _PasswordsService: PasswordsService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', Validators.required),
  });
  renewForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
  });

  forgetPassword() {
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    this._PasswordsService.forgetpassword(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message);
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  resetcode() {
    let code = this.resetCodeForm.value;
    console.log(this.email);

    this._PasswordsService.verfiyResetCode(code).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.status);
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  renewpassword(): void {
    console.log(this.email);

    let userForm = this.renewForm.value;
    userForm.email = this.email;
    console.log(userForm);
    this._PasswordsService.verfiyResetPassword(userForm).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._Router.navigate(['/home']);
        }
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
}
