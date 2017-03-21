import * as urls from './api/urls';

import { Category, Promotion, Role } from '@app/models';

import { ApiFactoryService } from '@app/services';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

  private categoriesSource = new BehaviorSubject<Category[]>(null);
  get categories$() {
    if (!this.categoriesSource.getValue()) {
      this.api._getCategories().subscribe(res => {
        this.categoriesSource.next(res);
      }, err => {
        this.snackBar.open('获取分类失败');
      });
    }
    return this.categoriesSource.flatMap(v => {
      if (v) {
        return Observable.of(v);
      } else {
        return this.api._getCategories().do(res => {
          this.categoriesSource.next(res);
        }, err => {
          this.snackBar.open('获取分类失败');
        });
      }
    });
  }
  // categories$ = this.categoriesSource.flatMap(v => {
  //   if (v) {
  //     return Observable.of(v);
  //   } else {
  //     return this.api._getCategories().do(res => {
  //       this.categoriesSource.next(res);
  //     }, err => {
  //       this.snackBar.open('获取分类失败');
  //     });
  //   }
  // });
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
