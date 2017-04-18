import { AppClientService, TopicService } from '@app/services';
import { Category, TopicFilter } from '@app/models';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'topic-filter',
  templateUrl: './topic-filter.component.html',
  styleUrls: ['./topic-filter.component.scss']
})
export class TopicFilterComponent implements OnInit {

  filter = defaultFilter();

  @Input()
  categoryList: Category[];

  constructor(
    private snackBar: MdSnackBar,
    private topic: TopicService,
    public appc: AppClientService
  ) { }

  ngOnInit() {
  }

  saveFilter() {
    localStorage.setItem('setting_categoryIds', this.filter.categoryIds.join(','));
  }

  isIn(id: number) {
    return this.filter.categoryIds.indexOf(id) !== -1;
  }

  cateChange(id: number, v: boolean) {
    if (v) {
      if (!this.isIn(id))
        this.filter.categoryIds.push(id);
    } else {
      this.filter.categoryIds = this.filter.categoryIds.filter(x => x !== id);
    }
    this.saveFilter();
  }

  submit() {
    this.topic.setFilter(this.filter);
  }

}

function defaultFilter() {
  const filter = new TopicFilter();
  filter.categoryIds = defaultCateIds();
  return filter;
}

function defaultCateIds() {
  const cid = localStorage.getItem('setting_categoryIds');
  if (!cid) return [];
  const cids = cid.split(',');
  if (cids.length < 1) return [];
  return cids.map((item) => +item);
}
