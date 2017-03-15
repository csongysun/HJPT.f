import * as fromRoot from '@app/redux/reducers';

import {
  Category,
  Promotion,
  Role,
} from '@app/models';
import { apiAction, yardAction } from '@app/redux/actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class AppClientService {

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  setTitle(title: string) {
    this.store.dispatch(new yardAction.SetTitleAction(title));
  }

  get categories$(): Observable<Array<Category>> {
    return this.store.let(fromRoot.content.getCategories)
      .do(v => {
        if (!v)
          this.store.dispatch(new apiAction.GetCategoriesAction());
      }).share();
  }
  get promotions$(): Observable<Array<Promotion>> {
    return this.store.let(fromRoot.content.getPromotions)
      .do(v => {
        if (!v)
          this.store.dispatch(new apiAction.GetPromotionsAction());
      }).share();
  }
  get roles$(): Observable<Array<Role>> {
    return this.store.let(fromRoot.user.getRoles)
      .do(v => {
        if (!v)
          this.store.dispatch(new apiAction.GetRolesAction());
      }).share();
  }
  get isRequesting$(): Observable<boolean> {
    return this.store.let(fromRoot.getRequestBusying).share();
  }

}
