import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { BaseSharedModule, AppComponent, ROUTES } from 'app';
import { reducer } from 'app-reducers';
import { AuthEffects } from 'app-effects'
import {
  LoginFormComponent,
  RegFormComponent,
} from 'app-components';
import {
  AuthComponent,
} from 'app-containers';
import {
  CacheService,
  ApiGatewayService,
  AuthService
} from 'app-services';

// import { CacheService } from '../services/cache/universal-cache';
// import { ApiGatewayService } from '../services/http/http-gateway.service';
// import { AuthService } from '../services/auth.service';

const MODULES = [
  BrowserModule,
  HttpModule,
  FormsModule,
  MaterialModule.forRoot(),
  BaseSharedModule,
  StoreModule.provideStore(reducer),
  RouterModule.forRoot(ROUTES),
  EffectsModule.run(AuthEffects),
  RouterStoreModule.connectRouter(),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
];
const COMPONENTS = [
  AppComponent,
  AuthComponent,
  LoginFormComponent,
  RegFormComponent,
];
const PROVIDERS = [
  ApiGatewayService,
  AuthService,
  CacheService,

];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  providers: [
    AuthService,
    CacheService,
    ApiGatewayService,
  ],
})
export class AppModule { }
