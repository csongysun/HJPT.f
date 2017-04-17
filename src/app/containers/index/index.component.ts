import {
  AppClientService,
  TopicService,
} from '@app/services';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  get recent$() {
    return this.topic.recent$;
  }

  constructor(
    private topic: TopicService,
    private app: AppClientService
  ) {
  }

  ngOnInit() {
    this.app.setTitle('主页');
  }
  ngOnDestroy() {
  }

}
