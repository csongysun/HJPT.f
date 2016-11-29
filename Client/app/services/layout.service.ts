
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/Observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class LayoutService {
  currentLayout: Layout;
  constructor() {
    this.currentLayout = this.width2Layout();
    Observable.fromEvent(window, 'resize')
      .debounceTime(400)
      .subscribe(size => {
        this.currentLayout = this.width2Layout();
      });
  };

  width2Layout() {
    if (window.innerWidth > 1000) {
      return Layout.Wide;
    }
    return Layout.Narrow;
  }
}

export enum Layout {
  Wide,
  Medium,
  Narrow,
}
