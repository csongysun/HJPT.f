import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Annex } from 'app-models';
import { FileUploadService } from 'app-services';
import { Observable } from 'rxjs';

@Component({ selector: 'app-file-uploader', templateUrl: './file-uploader.component.html', styleUrls: ['./file-uploader.component.scss'] })
export class FileUploaderComponent implements OnInit {

  @Input()
  label: string = '选择文件';
  @Input()
  multi: boolean = false;
  @Input()
  url: string = 'file';
  @Input()
  fileName: string = 'file';

  fileList: Array<Annex> = new Array<Annex>();

  @Input()
  get files(): Array<Annex> {
    return this.fileList;
  }
  @Output()
  filesChange: EventEmitter<Array<Annex>> = new EventEmitter<Array<Annex>>();

  info: string = 'info';
  isBusy: boolean = false;

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
        .subscribe(value => {
          if (!value) {
            this.info = '上传失败：返回数据不合法';
            $$.unsubscribe();
          }
          this.info = null;
          this.fileList.push(value);
          this.filesChange.emit(this.files);
        }, err => {
          this.info = JSON.stringify(err);
          $$.unsubscribe();
        }, () => {
          this.isBusy = false;
        });
  }

}
