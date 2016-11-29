import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { yardAction } from 'app-actions';
import { AppClientService } from 'app-services';
import { Topic, Category } from 'app-models';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit, OnDestroy {

  topic: Topic;
  selectedParentCategory: Category = new Category();
  parentCategories: Array<Category>;
  childCategories: Array<Category>;
  get selectedChildCategories(): Array<Category> {
    return this.childCategories.filter(v => Math.floor(v.id / 100) === this.selectedParentCategory.id);
  }

  @ViewChild('publishForm') publishForm;
  $publishForm: FormData;

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }
  publish() {
    this.$publishForm = new FormData(this.publishForm.nativeElement);
  }

  private cates$$: Subscription;
  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('种子'));
    this.cates$$ = this.store.let(fromRoot.getCategories).takeLast(1)
      .subscribe(v => {
        this.parentCategories = v.filter(x => x.id % 100 === 0);
        this.childCategories = v.filter(x => x.id % 100 !== 0);
      });
  }
  ngOnDestroy() {
    this.cates$$.unsubscribe();
  }

}

