import * as fromRoot from '@app/redux/reducers';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LoginReq } from '@app/models';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authAction } from '@app/redux/actions';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: LoginReq = new LoginReq();
  isBusy$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    this.isBusy$ = store.let(fromRoot.getIsLogging);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new authAction.LoginAction(this.form));
  }

}
