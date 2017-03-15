import * as fromRoot from '@app/redux/reducers';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {

  }
}

