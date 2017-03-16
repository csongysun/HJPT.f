import * as urls from './api/urls';

import {
  Category,
  Promotion,
  Role,
} from '@app/models';

import { ApiGatewayService } from '@app/services';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppClientService {

  private titleSource = new Subject<string>();
  title$ = this.titleSource.asObservable().share().last();;
  setTitle(title: string) {
    this.titleSource.next(title);
  }

  private categoriesSource = new Subject<Array<Category>>();
  categories$ = this.categoriesSource.asObservable()
    .do(v => {
      if (!v)
        this._getCategories();
    }).share().last();
  setCategories(categories: Array<Category>) {
    this.categoriesSource.next(categories);
  }
  _getCategories() {
    this.api.get(urls.content.category).subscribe(v => {
      this.setCategories(v);
    }, err => {
      this.snackBar.open('获取分类失败');
      console.log(err);
    })
  }

  private promotionsSource = new Subject<Array<Category>>();
  promotions$ = this.promotionsSource.asObservable()
    .do(v => {
      if (!v)
        this._getPromotions();
    }).share().last();
  setPromotions(promotions: Array<Category>) {
    this.promotionsSource.next(promotions);
  }
  _getPromotions() {
    this.api.get(urls.content.promotion).subscribe(v => {
      this.setPromotions(v);
    }, err => {
      this.snackBar.open('获取促销失败');
      console.log(err);
    })
  }

  private rolesSource = new Subject<Array<Category>>();
  roles$ = this.rolesSource.asObservable()
    .do(v => {
      if (!v)
        this._getRoles();
    }).share().last();
  setRoles(roles: Array<Category>) {
    this.rolesSource.next(roles);
  }
  _getRoles() {
    this.api.get(urls.user.role).subscribe(v => {
      this.setRoles(v);
    }, err => {
      this.snackBar.open('获取用户组失败');
      console.log(err);
    })
  }

  constructor(
    private api: ApiGatewayService,
    private snackBar: MdSnackBar
  ) { }

}
