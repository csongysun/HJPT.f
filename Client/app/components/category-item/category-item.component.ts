import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { Category } from 'app-models';
import { AppClientService } from 'app-services';
@Component({
  selector: 'admin-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  state: number = 0;
  hover: boolean = false;
  // 0->normal 1->edit
  temp: Category;

  @Input()
  item: Category;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
  }

  reset() {
    this.temp = null;
    this.state = 0;
  }
  edit() {
    this.temp = Object.assign({}, this.item);
    this.state = 1;
  }
  delete(id: number) {
    this.store.dispatch(new apiAction.DeleteCategoryAction(id));
  }

  submit() {
    if ((this.temp.orderId === this.item.orderId && this.temp.name === this.item.name)) {
      return this.reset();
    } // 没有更改
    this.store.dispatch(new apiAction.PutCategoryAction(this.temp));
    return this.reset();
  }

  get canSave(): boolean {
    if (this.temp.orderId === 0
      || this.temp.name.length <= 2) {
      return false;
    }
    return true;
  }

  get canSave$(): Observable<boolean> {

    return this.app.categories$.map(v => v.filter(v => v.orderId === this.temp.orderId || v.name === this.temp.name).length > 1)
  }

  ngOnInit() {
  }

}
