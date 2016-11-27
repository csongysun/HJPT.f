
import { Subject } from 'rxjs/subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
export class PubSubEvent<T> {
    subject: Subject<T>;
    obverser$: Observable<T>;
    constructor(){
        this.subject = new Subject<T>();
        this.obverser$ = this.subject.asObservable();
        this.publish = this.subject.next;
        this.subscribe = this.obverser$.subscribe;
    }
    publish: (value?: T)=> void;
    subscribe: (next?: (value: T) => void, error?: (error: any) => void, complete?: () => void)=> Subscription;
}
