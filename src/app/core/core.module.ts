import {
    ApiFactoryService,
    ApiGatewayService,
    AppClientService,
    AuthService,
    CacheService,
    FileUploadService,
    LayoutService,
    ToastService,
} from '@app/services';
import {
    LoginFormComponent,
    RegFormComponent,
} from '@app/components';
import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from '@angular/core';

import {
    AuthComponent,
} from '@app/containers';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    IntegerDirective,
} from '../directives';
import { MaterialModule } from '@angular/material';
import { ROUTES } from '../app.routes';
import { RouterModule } from '@angular/router';

const MODULES = [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
];
const COMPONENTS = [
    AuthComponent,
    LoginFormComponent,
    RegFormComponent,
];
const SERVICES = [
    CacheService,
    ToastService,
    LayoutService,
    ApiGatewayService,
    AuthService,
    AppClientService,
    ApiFactoryService,
    FileUploadService
]
@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS,
        //    IntegerDirective,
    ],
    exports: [
        ...COMPONENTS,
        FormsModule,
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