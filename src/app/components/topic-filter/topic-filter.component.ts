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
    return this.filter.categoryIds.indexOf(id) != -1
  }

  cateChange(id: number, v: boolean) {
    if (v) {
      if (!this.isIn(id))
        this.filter.categoryIds.push(id);
    }
    else {
      this.filter.categoryIds = this.filter.categoryIds.filter(v => v != id);
    }
    this.saveFilter();
  }

  submit() {
    this.topic.setFilter(this.filter);
  }

}

function defaultFilter(): TopicFilter {
  let pts = localStorage.getItem('setting_pageTake');
  let filter = new TopicFilter();
  filter.pageIndex = 1;
  filter.pageTake = pts ? parseInt(pts) : 50;
  filter.categoryIds = defaultCateIds();
  return filter;
}

function defaultCateIds(): Array<number> {
  let cid = localStorage.getItem('setting_categoryIds');
  if (!cid) return null;
  let cids = cid.split(',');
  if (cids.length < 1) return null;
  return cids.map((item) => parseInt(item));
}
