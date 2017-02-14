import * as urls from './api/urls';

import { Headers, RequestOptions } from '@angular/http';

import { ApiGatewayService } from 'app-services';
import { Injectable } from '@angular/core';
@Injectable()
export class FileUploadService {

  constructor(
    private api: ApiGatewayService
  ) { }

  upload<T>(name: string, file: any) {
    return this.api.upload<T>(urls.content.upload, name, file);
  }

}
