import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app';
import {

  TopicScrollerComponent,
  TorrentCardComponent,
  TorrentListComponent,
  PagingComponent,
  TopicFilterComponent,
  UserInfoComponent,

} from 'app-components';
import {
  DetailComponent,
  IndexComponent,
  PublishComponent,
  TorrentComponent,
  YardComponent
} from 'app-containers';
import {
  PublishService
} from 'app-services';

import { ROUTES } from './yard-routes';

const MODULES = [
  BaseSharedModule,
  RouterModule.forChild(ROUTES),
];
const COMPONENTS = [
  PagingComponent,
  TopicFilterComponent,
  TopicScrollerComponent,
  TorrentCardComponent,
  TorrentListComponent,
  DetailComponent,
  IndexComponent,
  PublishComponent,
  TorrentComponent,
  UserInfoComponent,
  YardComponent
];

COMPONENTS.forEach((value, index) => { if (!value) console.log(index); });

const SERVICES = [
  PublishService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...SERVICES
  ]
})
export class YardModule { }
