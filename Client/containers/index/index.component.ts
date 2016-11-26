import { Component, OnInit } from '@angular/core';

import { AppClientService } from 'app-shared';
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private app: AppClientService
  ) { }

  ngOnInit() {
    this.app.currentPage = 'Index';
  }

}
