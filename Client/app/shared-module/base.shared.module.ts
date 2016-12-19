/*
 * --Base-- SHARED Module
 * 
 * This has the most "basic" Shared imports that can be imported into 
 * all children (lazy-loaded for example) NgModules.
 * (ie: Admin NgModule can import this, to import all the basic App functionality, FormsModule, CommonModule etc)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import {
    UserInfoComponent
} from 'app-components';
import {
} from 'app-services';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        UserInfoComponent,
    ],
    providers:[
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,

        UserInfoComponent,
    ]
})
export class BaseSharedModule {

}
