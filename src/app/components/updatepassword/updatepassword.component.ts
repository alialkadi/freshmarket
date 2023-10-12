import { ToastrService } from 'ngx-toastr';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoupdateService } from 'src/app/services/infoupdate.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css'],
})
export class UpdatepasswordComponent {
  notCorrect: boolean = false;
  disabled: boolean = false;
  isLoading: boolean = false;
  messageErr: string = '';
  updatePassForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
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
  });
  constructor(
    private _InfoupdateService: InfoupdateService,
    private _ToastrService: ToastrService
  ) {}

  updateUserPassword(form: any) {
    this.isLoading = true;

    this._InfoupdateService.updatepassword(form.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.message == 'success') {
          this.isLoading = false;
          this._ToastrService.success('password Changed');
          localStorage.setItem('token', res.token);
        }
      },
      error: (err) => {
        if (
          err.error.message ==
          'User recently changed password! Please login again.'
        ) {
          this.disabled = true;
          this.messageErr = err.error.message;
        }
        console.log(err);
        if (err.error.errors.msg == 'Incorrect current password') {
          this._ToastrService.error(err.error.errors.msg);
          this.notCorrect = true;
        }
        this._ToastrService.info(err.error.errors.msg);
        this.isLoading = false;
      },
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
