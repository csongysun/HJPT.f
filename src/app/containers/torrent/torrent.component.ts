import * as fromRoot from '@app/redux/reducers';

import { Category, Topic, TopicFilter } from '@app/models';
import { Component, OnInit } from '@angular/core';
import { topicAction, yardAction } from '@app/redux/actions';

import { AppClientService } from '@app/services';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

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
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
    this.topics$ = store.let(fromRoot.getTopicCollection).distinctUntilChanged();
    this.categories$ = app.categories$;
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
