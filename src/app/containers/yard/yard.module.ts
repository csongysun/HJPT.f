import {
  DetailComponent,
  IndexComponent,
  ManageComponent,
  PublishComponent,
  TopicEditComponent,
  TorrentComponent,
  UserCenterComponent,
  YardComponent,
} from '@app/containers';
import {
  PagingComponent,
  TopicFilterComponent,
  TopicScrollerComponent,
  TorrentCardComponent,
  TorrentListComponent,
  UserInfoComponent,
} from '@app/components';
import {
  PublishService,
  TopicService,
} from '@app/services';

import { BaseSharedModule } from 'app';
import { NgModule } from '@angular/core';
import { ROUTES } from './yard-routes';
import { RouterModule } from '@angular/router';

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
  YardComponent,
  TopicEditComponent,
  ManageComponent,
  UserCenterComponent
];

COMPONENTS.forEach((value, index) => { if (!value) console.log(index); });

const SERVICES = [
  PublishService,
  TopicService
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
