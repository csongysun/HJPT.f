import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Topic,  TopicFilter, TopicsRep } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';
import { Action } from '@ngrx/store';

@Injectable()
export class TopicService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }

  GetRecentTopics(): Observable<Array<Topic>> {
    return this.api.getCache('/api/topic/recent');
  }

  GetTopics(filter: any): Observable<TopicsRep> {
    return this.api.get('/api/topic/recent', filter);
  }

  GetTopic(id: string): Observable<Topic> {
    return this.api.getCache('/api/topic/' + id);
  }

}
