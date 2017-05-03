import { AuthService, ToastService } from '@app/services';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LoginReq } from '@app/models';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form = new LoginReq();
  isBusy = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isBusy = true;
    this.auth._login(this.form).subscribe(() => {
      this.toast.info('登陆成功');
      this.router.navigate(['/']);
      this.isBusy = false;

    }, err => {
      this.toast.warn('登陆失败');
      this.isBusy = false;
    });
  }
}
