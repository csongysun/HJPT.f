import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, Role, Category } from 'app-models';
import { ApiGatewayService } from 'app-shared';

@Injectable()
export class AppClientService {

  private _currentUser: User;
  public get currentUser(): User {
    return this._currentUser;
  }
  public set currentUser(v: User) {
    // publish userinfo changed event

    this._currentUser = v;
  }

  private _currentPage: string;
  public get currentPage(): string {
    return this._currentPage;
  }
  public set currentPage(v: string) {
    this._currentPage = v;
  }


  constructor(
    private api: ApiGatewayService
  ) {

  }

  getCategories(): Observable<Array<Category>> {
    return this.api.getCache('/api/topic/categories', undefined, false)
      .map(data => {
        let categories = data as Array<Category>;
        if (!categories) throw ('Data Deserialize Failed');
        return categories;
      });
  }

}
