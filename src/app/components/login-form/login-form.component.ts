import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from '@app/services';
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
    private snackBar: MdSnackBar
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isBusy = true;
    this.auth._login(this.form).subscribe(() => {
      this.snackBar.open('登陆成功');
      this.router.navigate(['/']);
    }, err => {
      this.snackBar.open('登陆失败');
      console.log(err);
    }, () => {
      this.isBusy = false;
    });
  }
}
