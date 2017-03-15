import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from '@app/services';
import { LoginReq } from '@app/models';
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
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.auth._login(this.form).subscribe()
    this.store.dispatch(new authAction.LoginAction(this.form));
  }

}
