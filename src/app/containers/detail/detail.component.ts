import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import {
  ApiFactoryService,
  AppClientService,
  AuthService,
  ToastService,
  TopicService,
} from '@app/services';
import {
  Category,
  TempTopic,
  TopicRes,
} from '@app/models';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const prefix = 'http://localhost:5000';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit {

  isAdmin$ = this.auth.isAdmin$;

  topic = new TopicRes();

  download() {
    this.api._downloadTorrent(this.topic.id, this.topic.name);
  }
  size(length: number) {
    if (length > 1024 * 1024 * 1024) {
      return (length / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
    if (length > 1024 * 1024) {
      return (length / (1024 * 1024)).toFixed(2) + 'MB';
    }
    if (length > 1024) {
      return (length / (1024 * 1024)).toFixed(2) + 'KB';
    }
  }

  pcate: Category;
  ccate: Category;
  files;
  cover: string;
  screenShot: string[];
  lastAction: string;

  setLastAction() {
    let s = Date.now() - new Date(this.topic.lastAction).getTime();

    let minitus = Math.floor(s / (60 * 1000));
    if (minitus < 60) {
      return minitus + '分钟前';
    }
    minitus = s % (60);

    let hours = Math.floor(s / (3600 * 1000));
    if (hours < 60) {
      return hours + '小时' + minitus + '分钟前';
    }
    hours = s % 24;

    let days = Math.floor(s / (24 * 3600 * 1000));
    if (days < 30) {
      return days + '天' + hours + '小时前';
    }
    days = s % 30;

    let months = Math.floor(s / (30 * 24 * 3600 * 1000));
    if (months < 12)
      return months + '月' + days + '天前';
    months = s % 12;

    let years = Math.floor(s / (12 * 30 * 24 * 3600 * 1000));
    return years + '年' + months + '月前';

  }

  constructor(
    private topicService: TopicService,
    private app: AppClientService,
    private api: ApiFactoryService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.app.setTitle('种子详情');
    this.route.params
      .switchMap((params: Params) => this.api._getTopic(+params['id']))
      .zip(this.app.categories$)
      .subscribe(v => {
        this.topic = v[0];
        this.lastAction = this.setLastAction();

        this.app.categories$.subscribe(v => {

        })
        console.log(v[1].find(x => x.id == 103));
        this.pcate = v[1].find(x => x.id == (v[0].categoryId - v[0].categoryId % 100));
        this.ccate = v[1].find(x => x.id == v[0].categoryId);

        this.cover = JSON.parse(this.topic.cover).url.replace('wwwroot', prefix);
        this.files = JSON.parse(v[0].files);
        this.screenShot = JSON.parse(this.topic.screenShot).map(v => v.url.replace('wwwroot', prefix));
      }, err => {
        this.toast.warn("获取详情失败");
      });
  }

  ngAfterViewInit() {
  }

  toEdit() {
    let topic = new TempTopic();
    topic.IMDbUrl = this.topic.IMDbUrl;
    topic.categoryId = this.topic.categoryId;
    topic.cover = this.topic.cover;
    topic.description = this.topic.description;
    topic.screenShot = this.topic.screenShot;
    topic.title = this.topic.title;
    topic.subtitle = this.topic.subtitle;

    this.topicService.tempTopic = topic;
    this.router.navigate(['topic/edit'])
  }


}
