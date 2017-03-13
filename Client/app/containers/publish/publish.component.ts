import 'app-rxjs';

import * as fromRoot from 'app-reducers';
import * as urls from '../../services/api/urls';

import { AppClientService, PublishService } from 'app-services';
import { Category, TopicPublishReq } from 'app-models';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { appAction, yardAction } from 'app-actions';

import { Annex } from 'app-models';
import { FileUploaderComponent } from 'app-components';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit, OnDestroy {

  topic: TopicPublishReq = new TopicPublishReq();

  pcates = new Array<Category>();
  ccates = new Array<Category>();
  selectedP = new Category();
  get selectedCates(): Array<Category> {
    return this.ccates.filter(v => Math.floor(v.id / 100) === this.selectedP.id)
  }

  torrentFiles: Array<Annex> = new Array<Annex>();
  nfoFiles: Array<Annex> = new Array<Annex>();
  coverFiles: Array<Annex> = new Array<Annex>();
  screenShotFiles: Array<Annex> = new Array<Annex>();


  @ViewChild('torrentFile')
  torrenFile: FileUploaderComponent;

  @ViewChild('nfoFile')
  nfoFile: FileUploaderComponent;

  @ViewChild('coverFile')
  coverFile: FileUploaderComponent;

  @ViewChild('screenFile')
  screenFile: FileUploaderComponent;

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService,
    private publisher: PublishService
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
    this.publisher._getTempTopic().subscribe(v => {
      this.topic = Object.assign(this.topic, v);

    }, err => {
      console.log(err);
      this.store.dispatch(new appAction.MassageAction('无法获得临时Topic'));
    });
  }
  ngOnDestroy() {
    this.cates$$.unsubscribe();
  }

  onSubmit() {

    console.log(this.topic);
  }

}

