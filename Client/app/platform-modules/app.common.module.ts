/*
 * _Common_ NgModule to share between our "BASE" App.Browser & App.Server module platforms
 *
 *  If something belongs to BOTH, just put it Here.
 * - If you need something to be very "platform"-specific, put it 
 *   in the specific one (app.browser or app.server)
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Main "APP" Root Component
import { BaseSharedModule, AppComponent, ROUTES, appReducer } from 'app';

// Component imports

// Container (aka: "pages") imports
import {
    AuthComponent,
} from 'app-containers';

// Provider (aka: "shared" | "services") imports
import {
    CacheService, // Universal : XHR Cache
    ApiGatewayService
} from 'app-shared';

//////////////////////////////////////////////////////////////////

// This imports the variable that, in a hot loading situation, holds
// a reference to the previous application's last state before
// it was destroyed.
import { appState } from 'app';

const MODULES = [
    // Do NOT include UniversalModule, HttpModule, or JsonpModule here

    // This has ALL the "Common" stuff (CommonModule, FormsModule, ReactiveFormsModule, etc etc)
    // You would import this into your child NgModules so you don't need to duplicate so much code
    BaseSharedModule,

    // Angular
    RouterModule,

    // NgRx
    StoreModule.provideStore(appReducer, appState),
    EffectsModule,

    // Bootstrap
    //Ng2BootstrapModule,

    // Routing
    RouterModule.forRoot(ROUTES),

    MaterialModule.forRoot()
];

const PIPES = [
    // put pipes here
];

const COMPONENTS = [
    // put shared components here
    AppComponent,
    AuthComponent
];

const PROVIDERS = [
    // put shared services here
    CacheService,
    ApiGatewayService
];

@NgModule({
    // bootstrap: [AppComponent],
    imports: [
        ...MODULES
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS
    ],
    providers: [
        ...PROVIDERS
    ]
})
export class AppCommonModule { }