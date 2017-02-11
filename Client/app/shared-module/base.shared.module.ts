/*
 * --Base-- SHARED Module
 *
 * This has the most "basic" Shared imports that can be imported into 
 * all children (lazy-loaded for example) NgModules.
 * (ie: Admin NgModule can import this, to import all the basic App functionality, FormsModule, CommonModule etc)
 */

import {
} from 'app-components';
import {
} from 'app-services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    IntegerDirective,
    NumberDirective,
} from '../directives';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
    ],
    declarations: [
        IntegerDirective,
        NumberDirective
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        IntegerDirective,
        NumberDirective
    ]
})
export class BaseSharedModule {

}
