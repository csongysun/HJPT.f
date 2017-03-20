import { AppClientService, AuthService, Layout, LayoutService } from '@app/services';
import { Category, User } from '@app/models';
import { Component, NgZone, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.scss', './_yard-theme.scss']
})
export class YardComponent implements OnInit {

  get isWide(): boolean {
    return this.layout.currentLayout === Layout.Wide;
  };

  get title$(): Observable<string> {
    return this.app.title$;
  }
  get user$(): Observable<User> {
    return this.auth.currentUser$;
  }

  constructor(
    private layout: LayoutService,
    private app: AppClientService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }
}
