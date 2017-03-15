import * as fromRoot from '@app/redux/reducers';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SignUpReq } from '@app/models';
import { Store } from '@ngrx/store';
import { authAction } from '@app/redux/actions';

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {

  form: SignUpReq = new SignUpReq();
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
    this.store.dispatch(new authAction.RegisterAction(this.form));
  }

}
