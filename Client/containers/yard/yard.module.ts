import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { YardComponent } from './yard.component';
import { YardRoutingModule } from './yard-routes';

import { LayoutService } from 'app-shared';
import { TopicService } from 'app-services';
import { DetailComponent, PublishComponent, TorrentComponent, IndexComponent } from 'app-containers';

@NgModule({
  imports: [
    YardRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    YardComponent,
    DetailComponent,
    PublishComponent
    // IndexComponent,
    // TorrentComponent,
    // TopicScrollerComponent,
  ],
  providers: [
    LayoutService,
    TopicService
  ]
})
export class YardModule { }
