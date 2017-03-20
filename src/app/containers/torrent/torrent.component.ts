import { AppClientService, TopicService } from '@app/services';
import { Category, Topic, TopicFilter } from '@app/models';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit {

  get topics$(): Observable<Array<Topic>>{
    return this.topicService.topicList$;
  }

  pageIndex$: Observable<number>;
  pageCount$: Observable<number>;

  constructor(
    private app: AppClientService,
    private topicService: TopicService
  ) {
  }

  ngOnInit() {
    this.app.setTitle('种子');
  }


}
