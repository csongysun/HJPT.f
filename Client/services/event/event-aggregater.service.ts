import { Injectable } from '@angular/core';

import { Eventbase, PubSubEvent } from './event-base';

/// 似乎不应该增加加载代码体积
@Injectable()
export class EventAggregaterService {

  private events: { [key: string]: Eventbase } = {};

  constructor() { }

  // GetEvent<T extends Eventbase>(type: { new (): T }, key: string): T {
  //   let e = this.events[key];
  //   if (e) { return e as T; }
  //   this.events[key] = new type();
  //   return this.events[key] as T;
  // }

  GetEvent<T>(key: string): PubSubEvent<T> {
    let e = this.events[key];
    if (e) { return e as PubSubEvent<T>; }
    this.events[key] = new PubSubEvent<T>();
    return this.events[key] as PubSubEvent<T>;
  }

}
