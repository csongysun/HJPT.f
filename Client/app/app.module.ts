import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent, ROUTES } from 'app';
import { CoreModule } from './core/core.module';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    CoreModule.forRoot(),
  ],
  providers: [
  ],
})
export class AppModule {

}
