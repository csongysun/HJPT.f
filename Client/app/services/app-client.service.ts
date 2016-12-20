import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { User, Category } from 'app-models';

@Injectable()
export class AppClientService {

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  get categories$(): Observable<Array<Category>> {
    return this.store.let(fromRoot.content.getCategories)
      .do(v => {
        if (v.length === 0)
          this.store.dispatch(new apiAction.GetCategoriesAction());
      })
      .distinctUntilChanged();
  }

}
