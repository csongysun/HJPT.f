import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { DebugElement } from '@angular/core';

import { PublishComponent } from './publish.component';
import { AppClientService } from '../../shared';
import { Topic, Torrent } from '../../models';



describe('PublishComponent', () => {
    let comp: PublishComponent;
    let fixture: ComponentFixture<PublishComponent>;
    let app = {};
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule.forRoot(), FormsModule],
            declarations: [PublishComponent], // declare the test component
            providers: [{ provide: AppClientService, useValue: app }, MdSnackBar]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublishComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        comp.ngOnInit = () => { };
        comp.parentCategories = [{ id: 300, name: '300' }, { id: 400, name: '400' }];
        comp.childCategories = [{ id: 301, name: '301' }, { id: 302, name: '302' }, { id: 401, name: '401' }];
        comp.topic = new Topic();
        comp.topic.title = 'testTitle';
        comp.topic.subtitle = 'testSubtitle';
        fixture.detectChanges();
    });

    it('show formdata', () => {
        let $publishForm = new FormData(comp.publishForm.nativeElement);
        console.log($publishForm);
    });
});
