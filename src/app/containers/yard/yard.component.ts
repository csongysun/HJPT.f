import * as fromRoot from '@app/redux/reducers';

import { AppClientService, Layout, LayoutService } from '@app/services';
import { Category, User } from '@app/models';
import { Component, NgZone, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { apiAction } from '@app/redux/actions';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.scss', './_yard-theme.scss']
})
export class YardComponent implements OnInit {

  get isWide(): boolean {
    return this.layout.currentLayout == Layout.Wide;
  };

  get title$(): Observable<string> {
    return this.store.let(fromRoot.getToolbarTitle);
  }
  get user$(): Observable<User> {
    return this.store.let(fromRoot.getCurrentUser)
  }

  constructor(
    private layout: LayoutService,
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) { }

  ngOnInit() {
  }
}
