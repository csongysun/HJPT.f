import 'app-rxjs';

import * as fromRoot from 'app-reducers';

import { Category, Topic } from 'app-models';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { AppClientService } from 'app-services';
import { FileUploaderComponent } from 'app-components';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { yardAction } from 'app-actions';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit, OnDestroy {

  topic: Topic = new Topic();

  pcates = new Array<Category>();
  ccates = new Array<Category>();
  selectedP = new Category();
  get selectedCates(): Array<Category> {
    return this.ccates.filter(v => Math.floor(v.id / 100) === this.selectedP.id)
  }

  @ViewChild('torrentFile')
  torrentUploader: FileUploaderComponent;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService
  ) {
  }
  private cates$$: Subscription;
  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('发布种子'));
    this.cates$$ = this.app.categories$.subscribe(v => {
      if (v) {
        this.pcates = v.filter(x => x.id % 100 === 0);
        this.ccates = v.filter(x => x.id % 100 !== 0);
      }
    });
  }
  ngOnDestroy() {
    this.cates$$.unsubscribe();
  }

  onSubmit() {
    console.log(this.torrentUploader.fileList);
  }

}

