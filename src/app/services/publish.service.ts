import * as urls from './api/urls';

import { ApiFactoryService } from '@app/services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TempTopic } from '@app/models';

@Injectable()
export class PublishService {

  get tempTopic$() {
    return this.api._getTempTopic();
  }

  constructor(
    private api: ApiFactoryService,
  ) {
  }

  saveTempTopic(topic: TempTopic) {
    return this.api._saveTempTopic(topic);
  }

}
