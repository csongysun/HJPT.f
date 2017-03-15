import * as fromRoot from '@app/redux/reducers';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, animate, state, style, transition, trigger } from '@angular/core';
import { LoginReq, SignUpReq, Toast } from '@app/models';
import { appAction, authAction } from '@app/redux/actions';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('routeAnimations', [
      state('in', style({ right: 0, left: 0, opacity: 1, display: 'block' })),
      state('bout', style({ right: 0, left: '30%', opacity: 0, display: 'none' })),
      state('aout', style({ right: '30%', left: 0, opacity: 0, display: 'none' })),
      transition('aout <=> in', animate('200ms ease')),
      transition('bout <=> in', animate('200ms ease')),
      transition('void => in', animate(0))
    ]
    )
  ]
})
export class AuthComponent implements OnInit, OnDestroy {

  // @ViewChild('toastContainer', { read: ViewContainerRef })
  // toastContainer: ViewContainerRef;
  // toast$: Observable<Toast>;

  public astate: string;
  public bstate: string;
  private isLog: boolean;

  public loginReq = new LoginReq();
  public signUpReq = new SignUpReq();

  get isLogging(): Observable<boolean> {
    return this.store.let(fromRoot.getIsLogging);
  }

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
  ) {
    this.isLog = true;
    this.astate = 'in';
    this.bstate = 'bout';
  }
  toggle() {
    if (this.isLog) {
      this.astate = 'aout';
      this.bstate = 'in';
    } else {
      this.astate = 'in';
      this.bstate = 'bout';
    }
    this.isLog = !this.isLog;
  }

  login() {
    this.store.dispatch(new authAction.LoginAction(this.loginReq));
  }

  register() {
    this.store.dispatch(new authAction.RegisterAction(this.signUpReq));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if ((params['key'] === 'login') !== this.isLog) this.toggle();
    })
  }
  ngOnDestroy() {
  }

}
