import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
    Topic,
    TopicFilter,
    TopicsRep,
    Category,
    Promotion,
    Role,
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
    _postCategory(category: { orderId: number, name: string }): Observable<Category> {
        return this.api.post<Category>(urls.content.category, category);
    }
    _putCategory(category: Category): Observable<void> {
        return this.api.put<void>(urls.content.category + '/' + category.id, category);
    }
    _deleteCategory(id: number): Observable<void> {
        return this.api.delete<void>(urls.content.category + '/' + id);
    }

    _getPromotions(): Observable<Array<Promotion>> {
        return this.api.getCache<Array<Promotion>>(urls.content.promotion, null, true);
    }
    _postPromotion(promotion: Promotion): Observable<Promotion> {
        return this.api.post<Promotion>(urls.content.promotion, promotion);
    }
    _putPromotion(promotion: Promotion) {
        return this.api.put<void>(urls.content.promotion + '/' + promotion.id, promotion);
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

    _getRoles(): Observable<Array<Role>> {
        return this.api.getCache<Array<Role>>(urls.user.role, null, true);
    }
    _postRole(role: Role): Observable<Role> {
        return this.api.post<Role>(urls.user.role, role);
    }
    _putRole(role: Role) {
        return this.api.put<void>(urls.user.role + '/' + role.id, role);
    }
    _deleteRole(id: number) {
        return this.api.delete<void>(urls.user.role + '/' + id);
    }

}
