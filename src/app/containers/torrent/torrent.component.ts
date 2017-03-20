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

  get topicList$(){
    return this.topicService.topicList$;
  }

  get pages$(){
    return this.topicService.pages$;
  }
  get paging$(){
    return this.topicService.paging$;
  }

  constructor(
    private app: AppClientService,
    private topicService: TopicService
  ) {
  }

  ngOnInit() {
    this.app.setTitle('种子');
  }


}
