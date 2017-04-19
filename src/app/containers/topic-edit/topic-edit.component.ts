import '@app/utils';

import * as urls from '../../services/api/urls';

import {
  Annex,
  Category,
  TempTopic,
  TopicPublishReq,
} from '@app/models';
import {
  ApiFactoryService,
  AppClientService,
  ToastService,
  TopicService,
} from '@app/services';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FileUploaderComponent } from '@app/components';
import { FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.scss']
})
export class TopicEditComponent implements OnInit {

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
    this.topic.categoryId = this.selectedCates.length > 0 ? this.selectedCates[0].id : 0;
    this._spid = v;
  }

  url = urls;

  // #region files

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
    private toast: ToastService,
    private topicService: TopicService,
    private api: ApiFactoryService,
  ) {
  }

  ngOnInit() {
    this.app.setTitle('编辑种子');
    this.app.categories$.subscribe(v => {
      if (v) {
        this.pcates = v.filter(x => x.id % 100 === 0);
        this.ccates = v.filter(x => x.id % 100 !== 0);
      }
    }, err => {
      this.toast.warn('获取分类失败');
    });

    let v = this.topicService.tempTopic;
    this.topic = v;
    this.nfoFiles = this.topic.nfo ? Array.of(JSON.parse(this.topic.nfo)) : [];
    this.coverFiles = this.topic.cover ? Array.of(JSON.parse(this.topic.cover)) : [];
    this.screenShotFiles = this.topic.screenShot ? JSON.parse(this.topic.screenShot) : [];
    this.spid = this.topic.categoryId - this.topic.categoryId % 100;
  }

  onSubmit() {
    this.api._putEditTopic(this.topic).subscribe(() => {
      this.toast.info('修改成功');
    }, err => {
      this.toast.warn('修改失败');
    });
  }

}
