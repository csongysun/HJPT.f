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
} from 'app-components';
import {
  AdminIndexComponent,
  AdminManageComponent,
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

  CategoryManageComponent,
  CategoryItemComponent,
  PromotionManageComponent,
  PromotionItemComponent,
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
