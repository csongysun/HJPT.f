import { Component, OnInit, Input } from '@angular/core';

import { Topic } from 'app-models';
@Component({
  selector: 'app-torrent-card',
  templateUrl: './torrent-card.component.html',
  styleUrls: ['./torrent-card.component.scss']
})
export class TorrentCardComponent implements OnInit {

  @Input() topic: Topic

  constructor() { }

  ngOnInit() {
  }

}
