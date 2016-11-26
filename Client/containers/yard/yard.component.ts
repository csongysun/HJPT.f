import { Component, OnInit, NgZone } from '@angular/core';

import { AppClientService, LayoutService, Layout } from 'app-shared';

import { User } from 'app-models';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.scss']
})
export class YardComponent implements OnInit {

  public naviList: NaviItem[] = [
    { name: '主页', icon: undefined, url: '/index' },
    { name: '种子', icon: undefined, url: '/torrents' },
    { name: '发布', icon: undefined, url: '/publish' },
    { name: '规则', icon: undefined, url: '/index' }

  ];

  public currentUser: User;

  public title: string;

  public isWide: boolean;
  public isOpen: boolean;

  constructor(
    private app: AppClientService,
    private layout: LayoutService,
  ) {
    this.currentUser = app.currentUser;
    this.isWide = layout.currentLayout === Layout.Wide;
    layout.layoutChanged$.subscribe(value => {
      if ((value === Layout.Wide) !== this.isWide) {
        this.isWide = layout.currentLayout === Layout.Wide;
      }
    });

  }

  ngOnInit() {
  }

  onLayoutChanged(layout: Layout) {
    if ((layout === Layout.Wide) === this.isWide) { return; }

    // this.zone.run(() => this.isWide = this.layout.currentLayout === Layout.Wide);
    console.log('now this => ' + this.isWide);

    this.isWide = this.layout.currentLayout === Layout.Wide;

    console.log('update isWide => ' + this.isWide);
    // if (layout === Layout.Wide) {
    //   this.isWide = true;
    //   // this.sideMode = 'side';
    //   // this.showHam = false;
    // } else {
    //   this.isWide = false;
    //   // this.sideMode = 'over';
    //   // this.showHam = true;
    // }
  }

}

class NaviItem {
  public name: string;
  public icon: string;
  public url: string;
}
