import '@app/utils';

import * as urls from '../../services/api/urls';

import { Annex, TempTopic } from '@app/models';
import { AppClientService, PublishService } from '@app/services';
import { Category, TopicPublishReq } from '@app/models';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FileUploaderComponent } from '@app/components';
import { FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
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
  selectedCates = new Array<Category>();

  private _spid: number;
  public get spid() {
    return this._spid;
  }
  public set spid(v) {
    this.selectedCates = this.ccates.filter(p => Math.floor(p.id / 100) === v / 100);
    this._spid = v;
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
    private app: AppClientService,
    private publisher: PublishService,
    private snackBar: MdSnackBar
  ) {
  }

  ngOnInit() {
    this.app.setTitle('发布种子');
    this.app.categories$.subscribe(v => {
      if (v) {
        this.pcates = v.filter(x => x.id % 100 === 0);
        this.ccates = v.filter(x => x.id % 100 !== 0);
      }
    });
    this.publisher.tempTopic$.subscribe(v => {
      this.topic = Object.assign(this.topic, v);
    }, err => {
      this.snackBar.open('无法获得临时Topic');
    });

  }

  ngOnDestroy() {
  }

  onSubmit() {
  }

  saveDraft() {
    this.publisher.saveTempTopic(this.topic).subscribe(() => {
      this.snackBar.open('保存成功');
    }, err => {
      this.snackBar.open('保存失败');
    });
  }

}

