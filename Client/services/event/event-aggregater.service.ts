import { Injectable } from '@angular/core';

import { PubSubEvent } from './PubSubEvent';
import { User } from 'app-models';
/// 似乎不应该增加加载代码体积
@Injectable()
export class EventAggregater {

  private events: Map<string, PubSubEvent<any>>;
  constructor() { }
  GetEvent<T>(key: string): PubSubEvent<T> {
    let e = this.events[key];
    if (e) { return e as PubSubEvent<T>; }
    this.events[key] = new PubSubEvent<T>();
    return this.events[key] as PubSubEvent<T>;
  }
}
