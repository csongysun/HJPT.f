import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, Role, Category } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';
console.assert(
  ApiGatewayService 
  , "Uhoh, Something was not defined, likely part of a circular reference loop");
@Injectable()
export class AppClientService {
  
  constructor(
    private api: ApiGatewayService,
  ) {
  }

  getCategories(): Observable<Array<Category>> {
    return this.api.getCache<Array<Category>>('/api/topic/categories', undefined, false);
  }

}
