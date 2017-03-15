import * as fromRoot from '@app/redux/reducers';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { apiAction, yardAction } from '@app/redux/actions';

import { Observable } from 'rxjs/Observable';
import { PublishService } from '@app/services';
import { Store } from '@ngrx/store';
import { Topic } from '@app/models';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  recentTopics$: Observable<Array<Topic>>;

  constructor(
    private store: Store<fromRoot.State>,
    private publish: PublishService,
  ) {
    this.recentTopics$ = store.let(fromRoot.getRecentTopics);
  }

  private timer;
  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('主页'));
    this.timer = setInterval(() => {
      this.store.dispatch(new apiAction.GetRecentTopicsAction());
    }, 60000)
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
