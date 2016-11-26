import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { SignUpReq } from 'app-models';
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
export class AuthComponent implements OnInit {

  public UserKey: string;
  public Password: string;
  public Email: string;
  public StuId: string;
  public astate: string;
  public bstate: string;

  private InviteToken: string;
  private isLog: boolean;

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

  ngOnInit() {
  }

  login() {
    this.auth._login(this.UserKey, this.Password)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, err => {
        this.snackBar.open(err, 'OK');
      });
  }

  register() {
    let requestModel: SignUpReq = {
      UserName: this.UserKey,
      Password: this.Password,
      Email: this.Email,
      StuID: this.StuId,
      InviteToken: this.InviteToken
    };
    this.auth._register(requestModel).subscribe(data => {
      this.router.navigate(['/']);
    }, err => {
      this.snackBar.open(err, 'OK');
    });
  }

}
