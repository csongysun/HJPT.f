import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Annex } from '@app/models';
import { FileUploadService } from '@app/services';
import { Observable } from 'rxjs';

@Component({ selector: 'app-file-uploader', templateUrl: './file-uploader.component.html', styleUrls: ['./file-uploader.component.scss'] })
export class FileUploaderComponent implements OnInit {

  @Input()
  label = '选择文件';
  @Input()
  multi = false;
  @Input()
  url = 'file';
  @Input()
  fileName = 'file';

  fileList = new Array<Annex>();

  @Input()
  get files(): Array<Annex> {
    return this.fileList;
  }
  set files(v) {
    if (v)
      this.fileList = v;
    else this.fileList = [];
  }

  info = 'info';
  isBusy = false;

  constructor(private fus: FileUploadService) { }

  ngOnInit() { }

  fileChange(files) {
    this.isBusy = true;

    let list = [];
    if (this.multi) {
      list = files;
    } else {
      list.push(files[0]);
    }
    if (list.length < 1) {
      return;
    }

    const $$ =
      Observable.from(list)
        .concatMap(file => this.fus.upload<Annex>(this.fileName, file, this.url))
        .subscribe((value: Annex) => {
          if (!value) {
            this.info = '上传失败：返回数据不合法';
            $$.unsubscribe();
          }
          this.info = null;
          this.files = this.fileList.concat(value);
        }, err => {
          this.info = JSON.stringify(err);
          $$.unsubscribe();
        }, () => {
          this.isBusy = false;
        });
  }

}
