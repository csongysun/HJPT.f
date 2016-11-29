import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { BaseSharedModule } from 'app';
import {
  PagingComponent,
  TopicFilterComponent,
  TopicScrollerComponent,
  TorrentCardComponent,
  TorrentListComponent,
  UserInfoComponent
} from 'app-components';

import {
  DetailComponent,
  IndexComponent,
  PublishComponent,
  TorrentComponent,
  YardComponent
} from 'app-containers';

import {
  AppClientService,
  LayoutService,
  TopicService,
} from 'app-services';
import {
  ApiEffects,
  TopicEffects
} from 'app-effects'
import { ROUTES } from './yard-routes';

const MODULES = [
  // BaseSharedModule,
  RouterModule.forChild(ROUTES),
  EffectsModule.run(ApiEffects),
  EffectsModule.run(TopicEffects),

  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  MaterialModule,
];
let COMPONENTS = [
  PagingComponent,
  TopicFilterComponent,
  TopicScrollerComponent,
  TorrentCardComponent,
  TorrentListComponent,
  UserInfoComponent,
  DetailComponent,
  IndexComponent,
  PublishComponent,
  TorrentComponent,
  YardComponent
];
const PROVIDERS = [
  AppClientService,
  LayoutService,
  TopicService,
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    EffectsModule.run(ApiEffects),
    EffectsModule.run(TopicEffects),

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
  ],
  declarations: [
    PagingComponent,
    TopicFilterComponent,
    TopicScrollerComponent,
    TorrentCardComponent,
    TorrentListComponent,
    UserInfoComponent,
    DetailComponent,
    IndexComponent,
    PublishComponent,
    TorrentComponent,
    YardComponent
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class YardModule { }
