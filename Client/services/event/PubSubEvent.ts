
import { Subject } from 'rxjs/subject';
import { Observable } from 'rxjs/Observable';


//import { Subscription } from 'rxjs/Subscription';
// export class PubSubEvent<T> {
//     subject: Subject<T>;
//     obverser$: Observable<T>;
//     constructor() {
//         this.subject = new Subject<T>();
//         this.obverser$ = this.subject.asObservable();
//         this.publish = this.subject.next;
//         this.subscribe = this.obverser$.subscribe;
//     }
//     publish: (value?: T) => void;
//     subscribe: (next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) => Subscription;

// }



export class PubSubEvent<T> {



    private subscriptions: Array<Subscription>;

    /**
     *
     */
    constructor() {
        this.subscriptions = new Array<Subscription>();
    }

    publish(eventArg?: T) {
        this.subscriptions = this.subscriptions.filter(e => !e.Closed);
        this.subscriptions.forEach(e => e.action(eventArg));
    };
    subscribe(action: (eventArg: T) => void): Subscription {
        let s = new Subscription(action);
        this.subscriptions.push(s);
        return s;
    };

}

export class Subscription {
    Closed: boolean = false;
    /**
     *
     */
    constructor(public action: (eventArg: any) => void) { }
    public unsubscribe() {
        this.Closed = true;
    }
}
