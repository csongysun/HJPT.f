
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// import { PubSubEvent, EventAggregaterService } from './event';

@Injectable()
export class LayoutService {


  layoutChangeSource: Subject<Layout> = new Subject<Layout>();
  layoutChanged$ = this.layoutChangeSource.asObservable();

  private _layout: Layout;
  get currentLayout(): Layout {

    return this._layout;
  }
  set currentLayout(value: Layout) {
    this._layout = value;
    this.layoutChangeSource.next(value);
  }

  constructor(
    zone: NgZone,
  ) {
    this.currentLayout = this.width2Layout();

    window.addEventListener('resize', event => {
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
