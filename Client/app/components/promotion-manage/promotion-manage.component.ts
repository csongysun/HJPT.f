import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { Promotion } from 'app-models';
import { AppClientService } from 'app-services';
@Component({
  selector: 'admin-promotion-manage',
  templateUrl: './promotion-manage.component.html',
  styleUrls: ['./promotion-manage.component.scss']
})
export class PromotionManageComponent implements OnInit {

  temp: Promotion;
  state: number = 0;

  items$: Observable<Array<Promotion>>;
  isBusy$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
    this.items$ = app.promotions$;
    this.isBusy$ = store.let(fromRoot.getRequestBusying);
  }


  reset() {
    this.temp = null;
    this.state = 0;
  }
  add() {
    this.temp = new Promotion();
    this.state = 1;
  }

  submit() {
    if (this.state === 1) { // edit
      this.store.dispatch(new apiAction.PostPromotionAction(this.temp));
      return this.reset();
    }
  }

  get canSave(): boolean {
    if (this.temp.id === 0
      || !this.temp.name
      || this.temp.name.length <= 2) {
      return false;
    }
    return true;
  }

  get canSave$(): Observable<boolean> {

    return this.items$.map(v => v.filter(v => v.id === this.temp.id || v.name === this.temp.name).length > 0)
  }

  ngOnInit() {
  }


}
