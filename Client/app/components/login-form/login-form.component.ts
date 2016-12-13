import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app-reducers';
import { authAction } from 'app-actions';
import { LoginReq } from 'app-models';
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() form: LoginReq
  @Input() isBusy: boolean;
  @Output() submit = new EventEmitter();
  //@Output() toggle = new EventEmitter();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
  ) { }

  toSignUp(){
    this.router.navigate(['auth/signup']);
  }
  ngOnInit() {
  }

}
