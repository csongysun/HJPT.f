import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
    Topic,
    TopicFilter,
    TopicsRep,
    Category,
    Promotion,
} from 'app-models';
import { ApiGatewayService } from '../http-gateway.service';

import * as urls from './urls';

@Injectable()
export class ApiFactoryService {

    constructor(
        private api: ApiGatewayService,
    ) { }

    _getCategories(): Observable<Array<Category>> {
        return this.api.getCache<Array<Category>>(urls.content.category, undefined, true);
    }
    _postCategory(category: Category): Observable<void> {
        return this.api.post<void>(urls.content.category, category);
    }
    _putCategory(oldId: number, category: Category): Observable<void> {
        return this.api.put<void>(urls.content.category + '/' + oldId, category);
    }
    _deleteCategory(id: number): Observable<void> {
        return this.api.delete<void>(urls.content.category + '/' + id);
    }

    _getPromotions(): Observable<Array<Promotion>> {
        return this.api.getCache<Array<Promotion>>(urls.content.promotion, null, true);
    }
    _postPromotion(promotion: Promotion): Observable<void> {
        return this.api.post<void>(urls.content.promotion, promotion);
    }
    _putPromotion(oldId: number, promotion: Promotion) {
        return this.api.put<void>(urls.content.promotion + '/' + oldId, promotion);
    }
    _deletePromotion(id: number): Observable<void> {
        return this.api.delete<void>(urls.content.promotion + '/' + id);
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

}
