import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiFactoryService, AppClientService, AuthService, ToastService } from '@app/services';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { User } from '@app/models';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.scss']
})
export class UserCenterComponent implements OnInit {

  user = new User();
  get role() {
    return this.user.roles ? this.user.roles.join(',') : '--';
  }

  get shareRate(){
    if(this.user.downloaded) return '--';
    return (this.user.uploaded/this.user.downloaded).toFixed(2);
  }

  canAddToRole$ = this.auth.isAdmin$.map(v=>v&& this.user.roles.includes('Administrator'));

  constructor(
    private api: ApiFactoryService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private auth: AuthService,
    private app: AppClientService
  ) { }

  ngOnInit() {
    this.app.setTitle('用户信息');
    this.route.params
      .switchMap((params: Params) => this.api._getUserInfo(params['id']))
      .subscribe(v => {
        this.user = v.user;
        this.user.roles = v.roles;
        console.log(this.user);
      }, err => {
        this.toast.warn("获取详情失败");
      })
  }

  addToAdmin(){
    this.api._addUserToAdmin(this.user.email)     
    .subscribe(v => {
        this.toast.warn("添加成功");
        this.ngOnInit();
      }, err => {
        this.toast.warn("添加失败");
      })
  }

}
