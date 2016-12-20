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
  edit(c: Category) {
    this.temp = new Category();
    this.temp.id = c.id;
    this.temp.name = c.name;

    this.state = 1;
  }
  delete(id: number) {
    this.store.dispatch(new apiAction.DeleteCategoryAction(id));
  }

  submit(p: Category) {
    if ((this.temp.id === p.id && this.temp.name === p.name)) {
      return this.reset();
    } // 没有更改
    this.store.dispatch(new apiAction.PutCategoryAction({ oldId: p.id, category: this.temp }));
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

    return this.app.categories$.map(v => v.filter(v => v.id === this.temp.id || v.name === this.temp.name).length > 1)
  }

  ngOnInit() {
  }

}
