import { Component, OnInit, Input } from '@angular/core';

import { Topic } from 'app-models';
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

}
