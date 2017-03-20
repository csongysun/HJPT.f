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

  private filterSource = new Subject<TopicFilter>();
  get filter$() {
    return this.filterSource.asObservable().distinctUntilChanged();
  }
  setFilter(filter: TopicFilter) {
    this.filterSource.next(filter);
  }

  private searchSource = new Subject<string>();
  get search$() {
    return this.searchSource.asObservable().distinctUntilChanged();
  }
  setSearch(search: string) {
    this.searchSource.next(search);
  }

  private pagingSource = new BehaviorSubject<Paging>({ pageIndex: 1, pageCount: 1, pageTake: 50 });
  get paging$() {
    return this.pagingSource.asObservable().distinctUntilChanged().share();
  }
  setPaging(paging) {
    this.pagingSource.next(Object.assign(this.pagingSource.getValue(), paging));
  }
  get pages$() {
    return this.paging$.map(v => {
      let ps: number[] = [];
      if (v.pageIndex < 4) {
        for (let i = 1; i <= (v.pageCount < 7 ? v.pageCount : 7); i++) {
          ps.push(i);
        }
      } else if (v.pageIndex > v.pageCount - 4) {
        ps = [v.pageCount - 6,
        v.pageCount - 5,
        v.pageCount - 4,
        v.pageCount - 3,
        v.pageCount - 2,
        v.pageCount - 1,
        v.pageCount];
      } else {
        ps = [v.pageIndex - 3,
        v.pageIndex - 2,
        v.pageIndex - 1,
        v.pageIndex,
        v.pageIndex + 1,
        v.pageIndex + 2,
        v.pageIndex + 3];
      }
      return ps;
    })
  }

  get topicList$(): Observable<Array<Topic>> {
    return this.search$.combineLatest(this.filter$, this.paging$).mergeMap(v =>
      this.api._getTopicList(v[0], v[1], v[2])
    );
  }

  constructor(
    private api: ApiFactoryService
  ) { }

}
