import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as urls from './api/urls';
import { ApiGatewayService } from './http-gateway.service';


@Injectable()
export class PublishService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }

  _getTempTopic(): Observable<any> {
    return this.api.get<any>(urls.content.publishTopic);
  }
}
