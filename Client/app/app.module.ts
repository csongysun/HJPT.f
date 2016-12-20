import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent, ROUTES } from 'app';
import { CoreModule } from './core/core.module';
import { UserManageComponent } from './containers/user-manage/user-manage.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    UserManageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    CoreModule.forRoot(),
  ],

})
export class AppModule { }
