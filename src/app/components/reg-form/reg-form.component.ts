import { AuthService, ToastService } from '@app/services';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.isBusy = true;
    this.auth._register(this.form).subscribe(() => {
      this.toast.info("注册成功");
      this.router.navigate(['/']);
      this.isBusy = false;
    }, err => {
      this.toast.warn("注册失败");
      this.isBusy = false;
    });
  }

}
