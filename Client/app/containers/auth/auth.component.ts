import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { LoginReq, SignUpReq, Toast } from 'app-models';
import * as fromRoot from 'app-reducers';
import { authAction, appAction } from 'app-actions';
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('routeAnimations', [
      state('in', style({ right: 0, left: 0, opacity: 1 })),
      state('bout', style({ right: 0, left: '30%', opacity: 0 })),
      state('aout', style({ right: '30%', left: 0, opacity: 0 })),
      transition('aout <=> in', animate('200ms ease')),
      transition('bout <=> in', animate('200ms ease')),
      transition('void => in', animate(0))
    ]
    )
  ]
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer: ViewContainerRef;
  toast$: Observable<Toast>;

  public astate: string;
  public bstate: string;
  private isLog: boolean;

  public loginReq: LoginReq;
  public signUpReq: SignUpReq;

  get isLogging(): Observable<boolean> {
    return this.store.let(fromRoot.getIsLogging);
  }

  constructor(
    private store: Store<fromRoot.State>,
    private snackBar: MdSnackBar,
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
    this.store.dispatch(new authAction.loginAction(this.loginReq));
  }

  register() {
    this.store.dispatch(new authAction.registerAction(this.signUpReq));
  }

  ngOnInit() {
    let config = new MdSnackBarConfig();
    config.viewContainerRef = this.toastContainer;
    this.store.dispatch(new appAction.AddToastConfigAction({ key: 'auth', config: config }));
  }
  ngOnDestroy() {
  }

}
