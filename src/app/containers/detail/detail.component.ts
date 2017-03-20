import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

import { AppClientService } from '@app/services';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private app: AppClientService
  ) { }

  ngOnInit() {
    this.app.setTitle('种子');
  }

  ngAfterViewInit() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.textContent = '$(document).ready(function(){$(".collapsible").collapsible();});';
    this.elementRef.nativeElement.appendChild(s);
  }
}
