import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Topic, TopicFilter } from 'app-models';
import { ApiGatewayService } from 'app-shared';

@Injectable()
export class TopicService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }

  GetRecentTopics(): Observable<Array<Topic>> {
    return this.api.getCache('/api/topic/recent')
      .map(data => {
        let topics = data as Array<Topic>;
        return topics;
      });
  }

  GetTopics(filter: TopicFilter): Observable<Array<Topic>> {
    return this.api.get('/api/topic/recent', filter)
      .map(data => {
        let topics = data as Array<Topic>;
        return topics;
      });
  }

  GetTopic(id: string): Observable<Topic> {
    return this.api.getCache('/api/topic/' + id)
      .map(data => {
        let topic = data as Topic;
        return topic;
      });
  }

}
