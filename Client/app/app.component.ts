import { Component, ViewEncapsulation, Inject } from '@angular/core';
// import { isBrowser, isNode } from 'angular2-universal';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {

  // constructor( @Inject('req') req: any, @Inject('res') res: any) {
  //   console.log('req', req);
  //   console.log('res', res);
  // }

}

