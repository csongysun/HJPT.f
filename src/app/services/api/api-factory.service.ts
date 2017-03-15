import * as urls from './urls';

import {
    Category,
    Promotion,
    Role,
    Topic,
    TopicFilter,
    TopicsRep,
} from '@app/models';

import { ApiGatewayService } from '../http-gateway.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiFactoryService {

    constructor(
        private api: ApiGatewayService,
    ) { }

    _getCategories(): Observable<Array<Category>> {
        return this.api.getCache<Array<Category>>(urls.content.category, undefined, true);
    }

    _getPromotions(): Observable<Array<Promotion>> {
        return this.api.getCache<Array<Promotion>>(urls.content.promotion, null, true);
    }
    _getRecentTopics(): Observable<Array<Topic>> {
        return this.api.getCache<Array<Topic>>(urls.content.recentTopic);
    }
    _getTopics(filter: any): Observable<Array<Topic>> {
        return this.api.get<Array<Topic>>(urls.content.topic, filter);
    }
    _getTopic(id: string): Observable<Topic> {
        return this.api.getCache<Topic>(urls.content.topic + '/' + id);
    }

    _getRoles(): Observable<Array<Role>> {
        return this.api.getCache<Array<Role>>(urls.user.role, null, true);
    }

}
