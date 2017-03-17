import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '@app/models';
import { TopicService } from '@app/services';

@Component({
  selector: 'topic-scroller',
  templateUrl: './topic-scroller.component.html',
  styleUrls: ['./topic-scroller.component.scss'],
})
export class TopicScrollerComponent implements OnInit {

  @Input() topics: Array<Topic>;

  constructor(
  ) {}

  ngOnInit() {
  }

}
