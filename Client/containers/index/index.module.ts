import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ROUTES } from './index.routes';
import { IndexComponent } from './index.component';
import { TopicScrollerComponent } from 'app-components';

@NgModule({
  declarations: [
    TopicScrollerComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],

  providers: [
  ]
})
export class IndexModule { }
