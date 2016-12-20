import { Component, ViewEncapsulation, Inject, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { appAction } from 'app-actions';

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

