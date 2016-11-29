import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { yardAction, apiAction } from 'app-actions';
import { Topic } from 'app-models';
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  recentTopics$: Observable<Array<Topic>>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.recentTopics$ = store.let(fromRoot.getRecentTopics);
  }

  private timer: NodeJS.Timer;
  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('主页'));
    this.timer = setInterval(() => {
      this.store.dispatch(new apiAction.GetRecentTopicsAction());
    }, 5000)
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
