import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { LayoutService, Layout } from 'app-services';
import { User, Category } from 'app-models';

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
  ) { }

  ngOnInit() {
    this.store.dispatch(new apiAction.GetCategoriesAction());
  }
}
