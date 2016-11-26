import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';


import { Topic, TopicFilter } from 'app-models';
import { ApiGatewayService } from 'app-shared';


const URL:string = "/api/torrent/upload";

@Injectable()
export class TopicService {
    public uploader: FileUploader = new FileUploader({ url: URL });

    constructor(
        private api: ApiGatewayService,
    ) {

    }



}
