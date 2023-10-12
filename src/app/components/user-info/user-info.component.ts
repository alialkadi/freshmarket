import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  userInfo: any;
  notCorrect: boolean = false;
  disabled: boolean = false;
  isLoading: boolean = false;
  messageErr: string = '';
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  userInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z0-9]+$/),
    ]),
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });
  constructor(
    private _UserinfoService: UserinfoService,
    private _ToastrService: ToastrService
  ) {
    this._UserinfoService.getUserAddress().subscribe({
      next: (res) => {
        console.log(res);
        this.userInfo = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get() {
    this.step2 = true;
  }
  addAddress(form: any) {
    if (form.valid) {
      this._UserinfoService.addAddress(form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.userInfo = res.data;
          this._ToastrService.success(res.message);
        },
        error: (err) => {
          this._ToastrService.error(err.error.message);
        },
      });
    }
  }
  removeInfo(id: any) {
    this._UserinfoService.removeAddress(id).subscribe({
      next: (res) => {
        console.log(res);
        this.userInfo = res.data;
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
