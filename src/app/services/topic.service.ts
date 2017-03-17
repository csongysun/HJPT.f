import * as urls from './api/urls';

import { Topic, TopicFilter } from '@app/models';

import { ApiGatewayService } from '@app/services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TopicService {

  get recent$() {
    return Observable.interval(10000)
      .concatMap(v => this._getRecent());
  }
  _getRecent(): Observable<Array<Topic>> {
    return this.api.get(urls.content.recentTopic);
  }

  private filterSource = new Subject<TopicFilter>();
  get filter$(): Observable<TopicFilter> {
    return this.filterSource.asObservable().distinctUntilChanged();
  }
  setFilter(filter: TopicFilter) {
    this.filterSource.next(filter);
  }


  constructor(
    private api: ApiGatewayService
  ) { }

}
