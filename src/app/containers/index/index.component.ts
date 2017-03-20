import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TopicService } from '@app/services';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  get recent$() {
    return this.topic.recent$;
  }

  constructor(
    private topic: TopicService
  ) {
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
