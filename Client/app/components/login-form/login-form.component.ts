import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginReq } from 'app-models';
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() form: LoginReq
  @Input() isBusy: boolean;
  @Output() submit = new EventEmitter();
  @Output() toggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
