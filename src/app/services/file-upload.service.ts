import { Headers, RequestOptions } from '@angular/http';

import { ApiGatewayService } from '@app/services';
import { Injectable } from '@angular/core';

@Injectable()
export class FileUploadService {

  constructor(
    private api: ApiGatewayService
  ) { }

  upload<T>(name: string, file: any, url: string) {
    return this.api.upload(url, name, file);
  }

}
