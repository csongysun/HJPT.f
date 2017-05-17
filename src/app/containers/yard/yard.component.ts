import {
  AppClientService,
  AuthService,
  Layout,
  LayoutService,
  ToastService,
} from '@app/services';
import { Category, User } from '@app/models';
import { Component, HostListener, NgZone, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.scss']
})
export class YardComponent implements OnInit {

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.resizeSubject.next(width > 900);
  }

  private resizeSubject = new BehaviorSubject<boolean>(window.innerWidth > 900);
  isWide$ = this.resizeSubject.asObservable().throttleTime(200);


  get isAdmin$() { return this.auth.isAdmin$ };

  get title$(): Observable<string> {
    return this.app.title$;
  }
  get user$(): Observable<User> {
    return this.auth.currentUser$;
  }

  logout() {
    this.auth._logout().subscribe(() => {
      this.toast.info("退出登录");
    }, err => {
      this.toast.warn(err.message);
    })
  }

  onEnter(key: string){
    if(key.length < 4) return;
    this.router.navigate(['topic'], {queryParams: { 'search': key }})
  }

  constructor(
    private layout: LayoutService,
    private app: AppClientService,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {

  }

  ngOnInit() {

  }
}
