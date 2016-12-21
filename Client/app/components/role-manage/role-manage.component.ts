import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { Role } from 'app-models';
import { AppClientService } from 'app-services';

@Component({
  selector: 'admin-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {

  temp: string;
  state: number = 0;

  items$: Observable<Array<Role>>;
  isBusy$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
    this.items$ = app.roles$;
    this.isBusy$ = app.isRequesting$;
  }

  reset() {
    this.temp = null;
    this.state = 0;
  }
  add() {
    this.temp = '';
    this.state = 1;
  }
  submit(c: Role) {
    if (this.state === 1) { // add
      this.store.dispatch(new apiAction.PostRoleAction({name: this.temp}));
      return this.reset();
    }
  }

  get canSave(): boolean {
    if (!this.temp
      || this.temp.length <= 2) {
      return false;
    }
    return true;
  }
  get canSave$(): Observable<boolean> {
    return this.items$.map(v => v.filter(v => v.name === this.temp).length > 0)
  }

  ngOnInit() {
  }

}
