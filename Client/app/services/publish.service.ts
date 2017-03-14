import * as urls from './api/urls';

import { ApiGatewayService } from './http-gateway.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TempTopic } from 'app-models';

@Injectable()
export class PublishService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }

  _getTempTopic(): Observable<TempTopic> {
    return this.api.get<TempTopic>(urls.content.tempTopic);
  }

  _saveTempTopic(topic: TempTopic): Observable<void> {
    return this.api.post<void>(urls.content.tempTopic, topic);
  }

}
