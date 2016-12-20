import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from 'app-reducers';
import { AuthEffects, AppEffects, ApiEffects } from 'app-effects'
import { ROUTES } from '../app.routes';
import {
    CacheService,
    LayoutService,
    //TopicService,
    ApiGatewayService,
    AuthService,
    AppClientService,
    ApiFactoryService,
} from 'app-services';
import {
    LoginFormComponent,
    RegFormComponent,
} from 'app-components';
import {
    AuthComponent,
} from 'app-containers';
const MODULES = [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(AppEffects),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(ApiEffects),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
];
const COMPONENTS = [
    AuthComponent,
    LoginFormComponent,
    RegFormComponent,
];
const SERVICES = [
    CacheService,
    LayoutService,
    ApiGatewayService,
    AuthService,
    AppClientService,
    ApiFactoryService,
]
@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    providers: [
        ...SERVICES
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }
}