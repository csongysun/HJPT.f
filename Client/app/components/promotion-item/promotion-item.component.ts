import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { Promotion } from 'app-models';
import { AppClientService } from 'app-services';
@Component({
  selector: 'app-promotion-item',
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.scss']
})
export class PromotionItemComponent implements OnInit {

  state: number = 0;
  hover: boolean = false;
  // 0->normal 1->edit
  temp: Promotion;

  @Input()
  item: Promotion;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
  }

  reset() {
    this.temp = null;
    this.state = 0;
  }
  edit(c: Promotion) {
    this.temp = Object.assign({}, this.item);
    this.state = 1;
  }
  delete(id: number) {
    this.store.dispatch(new apiAction.DeletePromotionAction(id));
  }

  submit(p: Promotion) {
    if ((this.temp.id === p.id && this.temp.name === p.name && this.temp.upFold === p.upFold && this.temp.downFold === p.downFold)) {
      return this.reset();
    } // 没有更改
    this.store.dispatch(new apiAction.PutPromotionAction(this.temp));
    return this.reset();
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

    return this.app.promotions$.map(v => v.filter(v => v.id === this.temp.id || v.name === this.temp.name).length > 1)
  }

  ngOnInit() {
  }

}
