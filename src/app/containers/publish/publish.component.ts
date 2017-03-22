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
  torrentFiles: Array<Annex>;
  setTorrentFiles(v: Array<Annex>) {
    this.topic.torrent = v.length < 1 ? null : JSON.stringify(v[0]);
  }
  nfoFiles: Array<Annex>;
  setNfoFiles(v: Array<Annex>) {
    this.topic.nfo = v.length < 1 ? null : JSON.stringify(v[0]);
  }
  coverFiles: Array<Annex>;
  setCoverFiles(v: Array<Annex>) {
    this.topic.cover = v.length < 1 ? null : JSON.stringify(v[0]);
  }
  screenShotFiles: Array<Annex>;
  setScreenShotFiles(v: Array<Annex>) {
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
    }, err => {
      this.snackBar.open('获取分类失败');
    });

    this.publisher.tempTopic$.subscribe(v => {
      this.topic = Object.assign(this.topic, v);
      this.torrentFiles = this.topic.torrent ? Array.of(JSON.parse(this.topic.torrent)) : [];
      this.nfoFiles = this.topic.nfo ? Array.of(JSON.parse(this.topic.nfo)) : [];
      this.coverFiles = this.topic.cover ? Array.of(JSON.parse(this.topic.cover)) : [];
      this.screenShotFiles = this.topic.screenShot ? JSON.parse(this.topic.screenShot) : [];
      this.spid = this.topic.categoryId - this.topic.categoryId % 100;
    }, err => {
      this.snackBar.open('无法获得草稿');
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

