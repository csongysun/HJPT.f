import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '@app/models';

@Component({
  selector: 'torrent-list',
  templateUrl: './torrent-list.component.html',
  styleUrls: ['./torrent-list.component.scss']
})
export class TorrentListComponent implements OnInit {

  @Input() topics: Array<Topic>;

  constructor() { }

  ngOnInit() {
  }

  visible(innerElement: HTMLElement,
    adjustment?: any) {

    let innerRect = innerElement.getBoundingClientRect();
    let bottomAdjustment = (adjustment && adjustment.bottom || 0);
    
    return innerRect.bottom - bottomAdjustment > 0
      && innerRect.bottom < window.innerHeight;
  }

}
