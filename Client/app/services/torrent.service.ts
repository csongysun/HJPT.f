import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Topic, TopicFilter } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';


const URL:string = "/api/torrent/upload";

@Injectable()
export class TopicService {

    constructor(
        private api: ApiGatewayService,
    ) {

    }



}
