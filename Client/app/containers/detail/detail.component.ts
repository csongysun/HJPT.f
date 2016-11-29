import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app-reducers';
import { yardAction } from 'app-actions';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new yardAction.SetTitleAction('种子'));
  }

  ngAfterViewInit() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.textContent = "$(document).ready(function(){$('.collapsible').collapsible();});";
    this.elementRef.nativeElement.appendChild(s);
  }
}
