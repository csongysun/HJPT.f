/*
 * --Base-- SHARED Module
 *
 * This has the most "basic" Shared imports that can be imported into 
 * all children (lazy-loaded for example) NgModules.
 * (ie: Admin NgModule can import this, to import all the basic App functionality, FormsModule, CommonModule etc)
 */

import {
} from '@app/services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    IntegerDirective,
    NumberDirective,
} from '../directives';

import { CommonModule } from '@angular/common';
import {
    FileUploaderComponent,
} from '@app/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
    ],
    declarations: [
        IntegerDirective,
        NumberDirective,
        FileUploaderComponent
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        IntegerDirective,
        NumberDirective,
        FileUploaderComponent,
    ]
})
export class BaseSharedModule {

}
