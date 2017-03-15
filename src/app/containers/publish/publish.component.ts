import '@app/utils';

import * as fromRoot from '@app/redux/reducers';
import * as urls from '../../services/api/urls';

import { Annex, TempTopic } from '@app/models';
import { AppClientService, PublishService } from '@app/services';
import { Category, TopicPublishReq } from '@app/models';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { appAction, yardAction } from '@app/redux/actions';

import { FileUploaderComponent } from '@app/components';
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

  topic: TempTopic = new TempTopic();

  pcates = new Array<Category>();
  ccates = new Array<Category>();
  selectedP = new Category();
  get selectedCates(): Array<Category> {
    return this.ccates.filter(v => Math.floor(v.id / 100) === this.selectedP.id)
  }

  url = urls;

  // #region files
  private _torrentFiles: Array<Annex>;
  public get torrentFiles(): Array<Annex> {
    return this._torrentFiles;
  }
  public set torrentFiles(v: Array<Annex>) {
    this._torrentFiles = v;
    this.topic.torrent = v.length < 1 ? null : JSON.stringify(v[0]);
  }

  private _nfoFiles: Array<Annex>;
  public get nfoFiles(): Array<Annex> {
    return this._nfoFiles;
  }
  public set nfoFiles(v: Array<Annex>) {
    this._nfoFiles = v;
    this.topic.NFO = v.length < 1 ? null : JSON.stringify(v[0]);
  }

  private _coverFiles: Array<Annex>;
  public get coverFiles(): Array<Annex> {
    return this._coverFiles;
  }
  public set coverFiles(v: Array<Annex>) {
    this._coverFiles = v;
    this.topic.cover = v.length < 1 ? null : JSON.stringify(v[0]);
  }

  private _screenShotFiles: Array<Annex>;
  public get screenShotFiles(): Array<Annex> {
    return this._screenShotFiles;
  }
  public set screenShotFiles(v: Array<Annex>) {
    this._screenShotFiles = v;
    this.topic.screenShot = v.length < 1 ? null : JSON.stringify(v);
  }
  // #endregion

  constructor(
    private store: Store<fromRoot.State>,
    private app: AppClientService,
    private publisher: PublishService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('发布种子'));
    this.app.categories$.subscribe(v => {
      if (v) {
        this.pcates = v.filter(x => x.id % 100 === 0);
        this.ccates = v.filter(x => x.id % 100 !== 0);
      }
    });
    this.publisher._getTempTopic().subscribe(v => {
      this.topic = Object.assign(this.topic, v);
    }, err => {
      this.store.dispatch(new appAction.MassageAction('无法获得临时Topic'));
    });

    // Observable.of(this.torrentFiles, this.nfoFiles, this.coverFiles, this.screenShotFiles)
    //   .map(v)
  }

  ngOnDestroy() {
  }

  onSubmit() {
  }

  saveDraft() {
    this.publisher._saveTempTopic(this.topic).subscribe(() => {
      this.store.dispatch(new appAction.MassageAction('保存成功'));
    }, err => {
      this.store.dispatch(new appAction.MassageAction('保存失败'));
    });
  }

}

