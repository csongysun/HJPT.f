import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TopicFilter } from '@app/models';

@Injectable()
export class TopicService {

  private recentSource = new Subject<TopicFilter>();
  recent$ = this.recentSource.asObservable();
  setRecent(recent: TopicFilter) {
    this.recentSource.next(recent);
  }
  // getRecent(recent: )

  private recentSource = new Subject<TopicFilter>();
  recent$ = this.recentSource.asObservable().share().last();
  setFilter(recent: TopicFilter) {
    this.recentSource.next(recent);
  }

  constructor() { }

}
