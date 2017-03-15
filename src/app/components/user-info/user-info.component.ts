import * as fromRoot from '@app/redux/reducers';

import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { User } from '@app/models';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;

  constructor(private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

}
