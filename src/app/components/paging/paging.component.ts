import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Paging } from '@app/models';
import { TopicService } from '@app/services';

@Component({
  selector: 'topics-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Input()
  pages: number[];

  @Input()
  paging: Paging;

  @Output()
  onChange = new EventEmitter<number>();

  constructor() { }

  setPage(index: number) {
    this.onChange.emit(index);
  }

  ngOnInit() {
  }

}
