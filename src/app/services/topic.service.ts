import * as urls from './api/urls';

import { Paging, Topic, TopicFilter } from '@app/models';

import { ApiFactoryService } from '@app/services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TopicService {

  get recent$() {
    return Observable.interval(10000)
      .concatMap(v => this.api._getRecentTopics());
  }

  private filterSource = new BehaviorSubject<TopicFilter>(null);
  get filter$() {
    return this.filterSource.asObservable().distinctUntilChanged();
  }
  setFilter(filter: TopicFilter) {
    this.filterSource.next(filter);
  }

  private searchSource = new BehaviorSubject<string>(null);
  get search$() {
    return this.searchSource.asObservable().distinctUntilChanged();
  }
  setSearch(search: string) {
    this.searchSource.next(search);
  }

  private pagingSource = new BehaviorSubject<Paging>({ pageIndex: 1, count: 1, pageSize: 50 });
  get paging$() {
    return this.pagingSource.asObservable().distinctUntilChanged().share();
  }
  setPaging(paging) {
    this.pagingSource.next(Object.assign(this.pagingSource.getValue(), paging));
  }

  topicList$ = this.search$.combineLatest(this.filter$).mergeMap(v =>
    this.api._loadTopicList(v[0], v[1])
  );

  loadTopicList$(nextCursor?: string) {
    return this.api._loadTopicList(this.searchSource.getValue(), this.filterSource.getValue(), nextCursor);
  }

  constructor(
    private api: ApiFactoryService
  ) { }

}
