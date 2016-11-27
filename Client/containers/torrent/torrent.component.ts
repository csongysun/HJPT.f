import { Component, OnInit } from '@angular/core';

import { AppClientService } from 'app-shared';
import { TopicService } from 'app-services';

import { Topic, TopicFilter } from 'app-models';
@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit {

  topics: Array<Topic>;
  filter: TopicFilter;

  currentPageIndex: number = 1;
  pageCount: number = 10;

  pages: number[];
  getPages(): number[] {
    let ps: number[] = [];
    if (this.currentPageIndex < 4) {
      for (let i = 1; i <= (this.pageCount < 7 ? this.pageCount : 7); i++) {
        ps.push(i);
      }
    } else if (this.currentPageIndex > this.pageCount - 4) {
      ps = [this.pageCount - 6,
      this.pageCount - 5,
      this.pageCount - 4,
      this.pageCount - 3,
      this.pageCount - 2,
      this.pageCount - 1,
      this.pageCount];
    } else {
      ps = [this.currentPageIndex - 3,
      this.currentPageIndex - 2,
      this.currentPageIndex - 1,
      this.currentPageIndex,
      this.currentPageIndex + 1,
      this.currentPageIndex + 2,
      this.currentPageIndex + 3];
    }
    return ps;
  }

  constructor(
    private app: AppClientService,
    private topic: TopicService,
  ) {
    
  }

  ngOnInit() {
    this.app.currentPage = '种子';
    this.topic.GetTopics(this.filter).subscribe(topics => {
      this.topics = topics;
      this.setPage(1);
    });
  }

  setPage(index: number) {
    // if (index === this.currentPageIndex) { return; }
    this.currentPageIndex = index;
    // if (this.pages !== this.getPages()) { this.pages = this.getPages(); }
  }



}
