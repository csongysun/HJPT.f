import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Topic, TopicFilter } from 'app-models';
import { ApiGatewayService } from 'app-shared';
import { Action } from '@ngrx/store';

@Injectable()
export class TopicService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }

  GetRecentTopics(self: Action): Observable<Array<Topic>> {
    return this.api.getCache(self, '/api/topic/recent')
      .map(data => {
        let topics = data as Array<Topic>;
        return topics;
      });
  }

  GetTopics(self: Action, filter: TopicFilter): Observable<Array<Topic>> {
    return this.api.get(self, '/api/topic/recent', filter)
      .map(data => {
        let topics = data as Array<Topic>;
        return topics;
      });
  }

  GetTopic(self: Action, id: string): Observable<Topic> {
    return this.api.getCache(self, '/api/topic/' + id)
      .map(data => {
        let topic = data as Topic;
        return topic;
      });
  }

}
