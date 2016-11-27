import { Injectable } from '@angular/core';
import { PubSubEvent } from './PubSubEvent';

@Injectable()
export class EventAggregater {
  private events = new Map<string, PubSubEvent<any>>();
  constructor() { }
  get<T>(key: string): PubSubEvent<T>{
    let e = this.events.get(key)
    if(e)
      return e;
    e = new PubSubEvent<T>();
    this.events.set(key, e);
    return e;
  }
}
