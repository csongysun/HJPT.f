import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app-reducers';
import { Topic } from 'app-models';
@Component({
  selector: 'topic-scroller',
  templateUrl: './topic-scroller.component.html',
  styleUrls: ['./topic-scroller.component.scss'],
})
export class TopicScrollerComponent implements OnInit {

  @Input() topics: Array<Topic>

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
