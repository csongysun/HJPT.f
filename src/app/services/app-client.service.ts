import * as urls from './api/urls';

import { Category, Promotion, Role } from '@app/models';

import { ApiFactoryService } from '@app/services';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppClientService {

  private titleSource = new Subject<string>();
  get title$() { return this.titleSource.asObservable().share().last(); }
  setTitle(title: string) {
    this.titleSource.next(title);
  }

  private categoriesSource = new Subject<Category[]>();
  get categories$() {
    return this.categoriesSource.asObservable()
      .do(v => {
        if (!v) {
          this.api._getCategories().subscribe(res => {
            this.setCategories(res);
          }, err => {
            this.snackBar.open('获取分类失败');
          });
        }
      }).share().last();
  }
  setCategories(categories: Category[]) {
    this.categoriesSource.next(categories);
  }

  private promotionsSource = new Subject<Promotion[]>();
  get promotions$() {
    return this.promotionsSource.asObservable()
      .do(v => {
        if (!v) {
          this.api._getPromotions().subscribe(res => {
            this.setPromotions(res);
          }, err => {
            this.snackBar.open('获取促销失败');
          })
        }
      }).share().last();
  }
  setPromotions(promotions: Promotion[]) {
    this.promotionsSource.next(promotions);
  }

  private rolesSource = new Subject<Role[]>();
  get roles$() {
    return this.rolesSource.asObservable()
      .do(v => {
        if (!v) {
          this.api._getRoles().subscribe(res => {
            this.setRoles(res);
          }, err => {
            this.snackBar.open('获取用户组失败');
          });
        }
      }).share().last();
  }
  setRoles(roles: Role[]) {
    this.rolesSource.next(roles);
  }

  constructor(
    private api: ApiFactoryService,
    private snackBar: MdSnackBar
  ) { }

}
