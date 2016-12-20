import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { yardAction } from 'app-actions';
import { AppClientService } from 'app-services';
import { Topic, Category } from 'app-models';

import 'app-rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit, OnDestroy {

  topic: Topic = new Topic();

  pcates = new Array<Category>();
  ccates = new Array<Category>();
  selectedP = new Category();
  get selectedCates(): Array<Category> {
    return this.ccates.filter(v => Math.floor(v.id / 100) === this.selectedP.id)
  }

  @ViewChild('publishForm') publishForm;
  $publishForm: FormData;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
  }
  publish() {
    this.$publishForm = new FormData(this.publishForm.nativeElement);
  }

  private cates$$: Subscription;
  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('发布种子'));
    this.cates$$ = this.app.categories$.subscribe(v => {
      this.pcates = v.filter(x => x.id % 100 === 0);
      this.ccates = v.filter(x => x.id % 100 !== 0);
    })
  }
  ngOnDestroy() {
    this.cates$$.unsubscribe();
  }

}

