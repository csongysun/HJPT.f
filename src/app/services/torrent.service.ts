import { Topic, TopicFilter } from '@app/models';

import { ApiGatewayService } from './http-gateway.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const URL:string = "/api/torrent/upload";

@Injectable()
export class TopicService {

    constructor(
        private api: ApiGatewayService,
    ) {

    }



}
