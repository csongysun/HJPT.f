import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { LayoutService, Layout } from 'app-services';
import { User, Category } from 'app-models';

import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.scss', './_yard-theme.scss']
})
export class YardComponent implements OnInit {
  public naviList: NaviItem[] = [
    { name: '主页', icon: undefined, url: '/index' },
    { name: '种子', icon: undefined, url: '/torrents' },
    { name: '发布', icon: undefined, url: '/publish' },
    { name: '规则', icon: undefined, url: '/index' }
  ];

  get isWide(): boolean {
    return this.layout.currentLayout == Layout.Wide;
  };

  title$: Observable<string>;
  user$: Observable<User>;

  constructor(
    private layout: LayoutService,
    private store: Store<fromRoot.State>,
  ) {
    this.user$ = store.let(fromRoot.getCurrentUser);
    this.title$ = store.let(fromRoot.getToolbarTitle);
  }

  ngOnInit() {
    this.store.dispatch(new apiAction.GetCategoriesAction());
  }
}

class NaviItem {
  public name: string;
  public icon: string;
  public url: string;
}
