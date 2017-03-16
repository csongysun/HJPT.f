import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from '@app/services';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SignUpReq } from '@app/models';

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {

  form: SignUpReq = new SignUpReq();
  isBusy = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.isBusy = true;
    this.auth._login(this.form).subscribe(() => {
      this.snackBar.open("登陆成功");
    }, err => {
      this.snackBar.open("注册失败");
      console.log(err);
    }, () => {
      this.isBusy = false;
    });
  }

}
