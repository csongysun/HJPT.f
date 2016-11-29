import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { yardAction } from 'app-actions';
import { TopicFilter, Category } from 'app-models';

import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'topic-filter',
  templateUrl: './topic-filter.component.html',
  styleUrls: ['./topic-filter.component.scss']
})
export class TopicFilterComponent implements OnInit {

  @Input() categories: Array<Category>;

  cids: Array<number>;
  cids$: Observable<Array<number>>;
  tempCids: Array<number>;

  @Output() onChange: EventEmitter<{ categoriIds: Array<number> }> = new EventEmitter();


  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.cids$ = store.let(fromRoot.getCurrentFilter).select(filter => filter.categoryIds).distinctUntilChanged();
  }

  updateFilter() {
    if (this.cids.sort().toString() != this.tempCids.sort().toString())
      this.onChange.emit({ categoriIds: this.tempCids });
  }

  isIn(id: number) {
    return this.cids.indexOf(id) != -1
  }
  cateChange(id: number, v: boolean) {
    if (v) {
      if (!this.isIn(id))
        this.cids.push(id);
    }
    else {
      this.cids = this.cids.filter(v => v != id);
    }
    this.updateFilter();
  }

  private cids_: Subscription;
  ngOnInit() {
    this.cids_ = this.cids$.subscribe(v => {
      this.cids = v;
      this.tempCids = v.slice();
    })
  }
  ngOnDestroy() {
    this.cids_.unsubscribe();
  }

}
