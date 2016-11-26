import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppCommonModule } from './app.common.module';
import { AppComponent } from 'app';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
