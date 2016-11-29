import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { yardAction, topicAction } from 'app-actions';
import { Topic, TopicFilter, Category } from 'app-models';

import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit {

  topics$: Observable<Array<Topic>>;
  filter$: Observable<TopicFilter>;
  categories$: Observable<Array<Category>>;

  pageIndex$: Observable<number>;
  pageCount$: Observable<number>;


  get CategoryIds(): Observable<Array<number>> {
    return this.filter$.select(filter => filter.categoryIds);
  }
  get PageIndex(): Observable<number> {
    return this.filter$.select(filter => filter.pageIndex);
  }
  get PageTake(): Observable<number> {
    return this.filter$.select(filter => filter.pageTake);
  }

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.topics$ = this.store.let(fromRoot.getTopicCollection).distinctUntilChanged();
    this.categories$ = store.let(fromRoot.getCategories).takeLast(1);
    this.pageCount$ = store.let(fromRoot.getPageCount).takeLast(1);
  }

  refreshCollection(pa: any) {
    let f_ = this.filter$.takeLast(1).subscribe(v => {
      let filter: TopicFilter = Object.assign(v, pa);
      this.store.dispatch(new topicAction.SetFilterAction(filter));
    });
  }

  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('种子'));
  }


}
