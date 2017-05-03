import { Component, OnInit } from '@angular/core';

import { ApiFactoryService } from '@app/services';
import { UserMeta } from '@app/models';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  managerList: UserMeta[];
  publisherList: UserMeta[];

  constructor(
    private api:ApiFactoryService
  ) { }

  ngOnInit() {
  }

  addUserToManager(email: string){
    this.api._postAddUserToRole({email: email, roleName: 'admin'})
  }

  removeUserFromManager(email: string){
    this.api._postRemoveUserFromRole({email: email, roleName: 'admin'})

  }

  addUserToPublisher(email: string){
    this.api._postAddUserToRole({email: email, roleName: 'publisher'})
  }

  removeUserFromPublisher(email: string){
    this.api._postRemoveUserFromRole({email: email, roleName: 'publisher'})
  }

}
