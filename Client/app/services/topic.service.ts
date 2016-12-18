import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Topic,  TopicFilter, TopicsRep } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';

import * as urls from './urls';

@Injectable()
export class TopicService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }

  GetRecentTopics(): Observable<Array<Topic>> {
    return this.api.getCache(urls.topic.recent);
  }

  GetTopics(filter: any): Observable<TopicsRep> {
    return this.api.get(urls.topic.collection, filter);
  }

  GetTopic(id: string): Observable<Topic> {
    return this.api.getCache(urls.topic.collection + '/' + id);
  }

}
