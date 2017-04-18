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
  paging: Paging;

  @Output()
  onChange = new EventEmitter<number>();

  constructor() { }

  setPage(index: number) {
    this.onChange.emit(index);
  }
  getPages(): number[] {
    let ps: number[] = [];
    if (this.paging.pageIndex < 4) {
      for (let i = 1; i <= (this.paging.count < 7 ? this.paging.count : 7); i++) {
        ps.push(i);
      }
    } else if (this.paging.pageIndex > this.paging.count - 4) {
      ps = [this.paging.count - 6,
      this.paging.count - 5,
      this.paging.count - 4,
      this.paging.count - 3,
      this.paging.count - 2,
      this.paging.count - 1,
      this.paging.count];
    } else {
      ps = [this.paging.pageIndex - 3,
      this.paging.pageIndex - 2,
      this.paging.pageIndex - 1,
      this.paging.pageIndex,
      this.paging.pageIndex + 1,
      this.paging.pageIndex + 2,
      this.paging.pageIndex + 3];
    }
    return ps;
  }
  ngOnInit() {
  }

}
