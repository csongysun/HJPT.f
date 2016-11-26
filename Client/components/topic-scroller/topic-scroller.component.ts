import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TopicService } from 'app-services';
import { Topic } from 'app-models';
@Component({
  selector: 'topic-scroller',
  templateUrl: './topic-scroller.component.html',
  styleUrls: ['./topic-scroller.component.scss'],
  providers: [MdSnackBar]
})
export class TopicScrollerComponent implements OnInit {

  topics: Array<Topic>;

  constructor(
    private topic: TopicService,
    private snack: MdSnackBar
  ) { }

  ngOnInit() {
    this.topic.GetRecentTopics().subscribe(topics => {
      this.topics = topics;
    }, err => {
      this.snack.open(err, 'ok');
    });
  }

}
