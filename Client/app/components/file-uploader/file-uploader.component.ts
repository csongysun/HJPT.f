import { Component, OnInit } from '@angular/core';

import { Annex } from 'app-models';
import { FileUploadService } from 'app-services';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  fileList: Array<Annex> = new Array<Annex>();
  info: string;

  constructor(
    private fus: FileUploadService
  ) { }

  ngOnInit() {
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length < 1) { return; }
    const file = fileList[0];
    this.fus.upload<Annex>('file', file)
      .subscribe(value => {
        if (!value) {
          this.info = '上传失败：返回数据不合法';
        }
        this.fileList.push(value);
      }, err => {
        this.info = JSON.stringify(err);
      });
  }

}
