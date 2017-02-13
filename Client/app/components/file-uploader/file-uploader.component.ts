import { Component, OnInit } from '@angular/core';

import { Annex } from 'app-models';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  fileList: Array<Annex>;

  constructor() { }

  ngOnInit() {
  }

}
