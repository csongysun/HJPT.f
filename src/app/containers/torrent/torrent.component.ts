import {
  ApiFactoryService,
  AppClientService,
  TopicService,
} from '@app/services';
import {
  Category,
  Topic,
  TopicFilter,
  TopicListItemRes,
} from '@app/models';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit, OnDestroy {

  private topicListSource = new BehaviorSubject<TopicListItemRes[]>([]);
  topicList$ = this.topicListSource.asObservable();

  isLoading = false;
  canLoad = true;
  nextCursor: string;

  loadTail() {
    if (this.isLoading || !this.nextCursor) return;
    this.isLoading = true;
    this.topicService.loadTopicList$(this.nextCursor).subscribe(v => {
      let tl = this.topicListSource.getValue();
      tl.push(...v.list);
      this.topicListSource.next(tl);
      this.nextCursor = v.nextCursor;
    }, err => {
    }, () => { this.isLoading = false });
  }

  get cates$() {
    return this.app.parentCates$;
  }

  get paging$() {
    return this.topicService.paging$;
  }

  constructor(
    private app: AppClientService,
    private topicService: TopicService,
  ) {
  }

  topicList$$: Subscription;
  ngOnInit() {
    this.app.setTitle('种子列表');
    this.topicList$$ = this.topicService.topicList$.subscribe(v => {
      this.topicListSource.next(v.list);
      this.nextCursor = v.nextCursor;
    }, err => {
    }, () => { this.isLoading = false });
  }
  ngOnDestroy() {
    this.topicList$$.unsubscribe();
  }

}
