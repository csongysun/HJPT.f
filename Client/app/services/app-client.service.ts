import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { apiAction } from 'app-actions';
import { User, Category } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';
console.assert(
  ApiGatewayService
  , "Uhoh, Something was not defined, likely part of a circular reference loop");
@Injectable()
export class AppClientService {


  constructor(
    private api: ApiGatewayService,
    private store: Store<fromRoot.State>,
  ) { 
  }
  _getCategories(): Observable<Array<Category>> {
    return this.api.getCache<Array<Category>>('/api/topic/categories', undefined, false);
  }

  get Categories$(): Observable<Array<Category>> {
    return this.store.let(fromRoot.getCategories)
      .do(v => {
        if (v.length === 0)
          this.store.dispatch(new apiAction.GetCategoriesAction());
      })
  }

}
