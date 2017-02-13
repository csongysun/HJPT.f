import { AppComponent, ROUTES } from 'app';

import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    CoreModule.forRoot(),
  ],

})
export class AppModule { }
