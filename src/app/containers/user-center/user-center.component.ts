import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiFactoryService, ToastService } from '@app/services';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { User } from '@app/models';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.scss']
})
export class UserCenterComponent implements OnInit {

  user: User;
  get role() {
    return
  }

  constructor(
    private api: ApiFactoryService,
    private route: ActivatedRoute,
    private toast: ToastService,

  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.api._getUserInfo(params['id']))
      .subscribe(v => {
        this.user = v;
      }, err => {
        this.toast.warn("获取详情失败");
      })
  }

}
