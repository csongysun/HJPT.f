import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ROUTES } from './yard-routes';
import { LayoutService } from 'app-shared';
import { TopicService } from 'app-services';
import { YardComponent, DetailComponent, PublishComponent, TorrentComponent, IndexComponent } from 'app-containers';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
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
