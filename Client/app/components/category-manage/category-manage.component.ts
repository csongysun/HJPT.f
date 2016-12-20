import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { Category } from 'app-models';
import { AppClientService } from 'app-services';
@Component({
  selector: 'admin-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  temp: Category;
  state: number = 0;

  items$: Observable<Array<Category>>;
  isBusy$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
    this.items$ = app.categories$;
    this.isBusy$ = store.let(fromRoot.getRequestBusying);
  }


  reset() {
    this.temp = null;
    this.state = 0;

  }
  add() {
    this.temp = new Category();
    this.state = 2;

  }
  edit(c: Category) {
    this.temp = new Category();
    this.temp.id = c.id;
    this.temp.name = c.name;
    this.state = 1;

  }
  submit(c: Category) {
    if (this.state === 1) { // edit
      if ((this.temp.id === c.id && this.temp.name === c.name)) {
        return this.reset();
      } // 没有更改
      this.store.dispatch(new apiAction.PutCategoryAction({ oldId: c.id, category: this.temp }));
      return this.reset();
    }
    if (this.state === 2) { // add
      this.store.dispatch(new apiAction.PostCategoryAction(this.temp));
      return this.reset();

    }
    throw 'err in submit(c: Category) -> state invalid';
  }

  delete(id: number) {
    this.store.dispatch(new apiAction.DeleteCategoryAction(id));
  }

  get canSave(): Observable<boolean> {
    if (!this.temp || this.temp.id === 0
      || !this.temp.name
      || this.temp.name.length <= 4) {
      return Observable.of(false);
    }
    return this.items$.map(v => v.filter(v => v.id === this.temp.id || v.name === this.temp.name).length > 1)
  }

  ngOnInit() {
  }

}
