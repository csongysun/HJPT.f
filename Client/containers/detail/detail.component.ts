import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import { AppClientService } from 'app-shared';

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
    this.app.currentPage = '详情';
  }

  ngAfterViewInit() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.textContent = "$(document).ready(function(){$('.collapsible').collapsible();});";
    this.elementRef.nativeElement.appendChild(s);
  }
}
