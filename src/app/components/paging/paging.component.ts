import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'topics-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Input() pageIndex: number;
  @Input() pageCount: number;

  @Output() onChange = new EventEmitter<{ pageIndex: number }>();

  constructor() { }

  getPages(): number[] {
    let ps: number[] = [];
    if (this.pageIndex < 4) {
      for (let i = 1; i <= (this.pageCount < 7 ? this.pageCount : 7); i++) {
        ps.push(i);
      }
    } else if (this.pageIndex > this.pageCount - 4) {
      ps = [this.pageCount - 6,
      this.pageCount - 5,
      this.pageCount - 4,
      this.pageCount - 3,
      this.pageCount - 2,
      this.pageCount - 1,
      this.pageCount];
    } else {
      ps = [this.pageIndex - 3,
      this.pageIndex - 2,
      this.pageIndex - 1,
      this.pageIndex,
      this.pageIndex + 1,
      this.pageIndex + 2,
      this.pageIndex + 3];
    }
    return ps;
  }

  setPage(index: number) {
    this.onChange.emit({ pageIndex: index });
  }

  ngOnInit() {
  }

}
