import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, Role, Category } from 'app-models';
import { ApiGatewayService } from 'app-shared';
import { EventAggregater } from 'app-services';

@Injectable()
export class AppClientService {

  isLoggedIn: boolean;
  currentUser: User;
  currentPage: string;
  categories: Array<Category>;

  constructor(
    private api: ApiGatewayService,
    private event$: EventAggregater
  ) {
    this.getCategories().take(1).subscribe(data => {
      this.categories = data;
    }, err => {
    })
    this.event$.get<User>('LOGIN').subscribe(user => { this.isLoggedIn = true; this.currentUser = user });
    this.event$.get('LOGOUT').subscribe(() => { this.isLoggedIn = false; this.currentUser = null });

  }

  getCategories(): Observable<Array<Category>> {
    return this.api.getCache<Array<Category>>('/api/topic/categories', undefined, false);
  }

}
