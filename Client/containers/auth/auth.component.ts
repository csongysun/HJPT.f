import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { LoginReq, SignUpReq } from 'app-models';
import { AuthService } from 'app-shared';

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

  public astate: string;
  public bstate: string;
  private isLog: boolean;

  public loginReq: LoginReq;
  public signUpReq: SignUpReq;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MdSnackBar
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
    this.auth._login(this.loginReq).take(1)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, err => {
        this.snackBar.open(err, 'OK');
      });
  }

  register() {
    this.auth._register(this.signUpReq).take(1)
      .subscribe(data => {
        this.router.navigate(['/']);
      }, err => {
        this.snackBar.open(err, 'OK');
      });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
