import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '@app/services';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@app/models';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  user: User;

  constructor(
    private auth: AuthService
  ) { }

  private user$$: Subscription;
  ngOnInit() {
    this.user$$ = this.auth.currentUser$.subscribe(v => {
      this.user = v;
    });
  }
  ngOnDestroy() {
    this.user$$.unsubscribe();
  }



}
