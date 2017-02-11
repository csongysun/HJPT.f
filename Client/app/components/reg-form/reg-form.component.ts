import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SignUpReq } from 'app-models';

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {

  form: SignUpReq = new SignUpReq();
  isBusy$: Observable<boolean>;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

}
