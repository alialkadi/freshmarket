import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InfoupdateService } from 'src/app/services/infoupdate.service';

@Component({
  selector: 'app-updateuserinfo',
  templateUrl: './updateuserinfo.component.html',
  styleUrls: ['./updateuserinfo.component.css'],
})
export class UpdateuserinfoComponent {
  notCorrect: boolean = false;
  disabled: boolean = false;
  isLoading: boolean = false;
  messageErr: string = '';
  userInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-zA-Z0-9]+$/),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  constructor(
    private _InfoupdateService: InfoupdateService,
    private _ToastrService: ToastrService
  ) {}
  updateUserInfo(form: any) {
    this.isLoading = true;
    this._InfoupdateService.updateInfo(form.value).subscribe({
      next: (res) => {
        this._ToastrService.show(res.message);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        if (
          err.error.message ==
          'User recently changed password! Please login again.'
        ) {
          this.disabled = true;
          this.messageErr = err.error.message;
        }
        console.log(err);
        if (err.error.errors.msg == 'E-mail already in use') {
          this._ToastrService.success(err.error.errors.msg);
          this.notCorrect = true;
        }
        this.isLoading = false;
      },
    });
  }
}
