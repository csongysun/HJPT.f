import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { TorrentRoutingModule } from './torrent-routing.module';
import { TorrentComponent } from './torrent.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TorrentRoutingModule
  ],
  declarations: [
    TorrentComponent
  ]
})
export class TorrentModule { }
