import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiGatewayService } from './http-gateway.service';


@Injectable()
export class PublishService {

  constructor(
    private api: ApiGatewayService,
  ) {

  }
}
