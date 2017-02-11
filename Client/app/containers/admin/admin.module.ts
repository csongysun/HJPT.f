import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AdminComponent } from './admin.component';
import { BaseSharedModule } from 'app';

import {
  CategoryManageComponent,
  CategoryItemComponent,
  PromotionManageComponent,
  PromotionItemComponent,
  RoleManageComponent,
  RoleItemComponent,
} from 'app-components';
import {
  AdminIndexComponent,
  AdminManageComponent,
  UserManageComponent,
} from 'app-containers';
import {
  AdminGuard
} from 'app-services';

import { ROUTES } from './admin-routes';

const MODULES = [
  BaseSharedModule,
  RouterModule.forChild(ROUTES),
];
const COMPONENTS = [
  AdminComponent,
  AdminIndexComponent,
  AdminManageComponent,
  UserManageComponent,

  CategoryManageComponent,
  CategoryItemComponent,
  PromotionManageComponent,
  PromotionItemComponent,
  RoleManageComponent,
  RoleItemComponent,

];
const PROVIDERS = [
  AdminGuard
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ],
})
export class AdminModule { }
