import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApiGatewayService } from 'app-services';

@Injectable()
export class AdminService {

  constructor(
    private api: ApiGatewayService
  ) { }


}
