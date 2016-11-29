import { Component, ViewEncapsulation, Inject, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { appAction } from 'app-actions';
import { Toast } from 'app-models';
// import { isBrowser, isNode } from 'angular2-universal';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  // @ViewChild('toastContainer', { read: ViewContainerRef })
  // toastContainer: ViewContainerRef;
  // toast$: Observable<Toast>;

  constructor(
    private snackBar: MdSnackBar,
    private store: Store<fromRoot.State>
  ) {
    // this.toast$ = this.store.let(fromRoot.getToast);
    // this.toast$.filter(toast => toast.massage !== '')
    //   .subscribe((toast) => {
    //     this.snackBar.open(toast.massage, null, toast.config);
    //   })
  }

  ngOnInit() {
    // let config = new MdSnackBarConfig();
    // config.viewContainerRef = this.toastContainer;
    // this.store.dispatch(new appAction.AddToastConfigAction({ key: 'app', config: config }));
  }
}

