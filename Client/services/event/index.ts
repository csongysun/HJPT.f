export * from './event-aggregater.service';
import { PubSubEvent } from './PubSubEvent';
import { User } from 'app-models';


export type loginEvent = PubSubEvent<User>; 
