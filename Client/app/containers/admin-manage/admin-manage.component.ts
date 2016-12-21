import { Component, OnInit } from '@angular/core';

import { AppClientService } from 'app-services';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss']
})
export class AdminManageComponent implements OnInit {

  constructor(
    private app: AppClientService
  ) {
  }

  ngOnInit() {
    this.app.setTitle('内容管理');
  }

}
