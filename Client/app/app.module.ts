import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TorrentListComponent } from './g/torrent-list/torrent-list.component';
import { TorrentPanelComponent } from './g/torrent-panel/torrent-panel.component';
import { TorrentCardComponent } from './g/torrent-card/torrent-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TorrentListComponent,
    TorrentPanelComponent,
    TorrentCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
