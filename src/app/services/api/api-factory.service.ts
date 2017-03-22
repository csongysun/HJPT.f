import * as urls from './urls';

import { Category, Paging, Promotion, Role, TempTopic, Topic, TopicFilter, TopicsRep } from '@app/models';

import { ApiGatewayService } from '../http-gateway.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TopicListQuery } from '@app/models';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ApiFactoryService {

    constructor(
        private api: ApiGatewayService,
    ) { }

    _getCategories(): Observable<Array<Category>> {
        return this.api.get(urls.content.category);
    }

    _getPromotions(): Observable<Array<Promotion>> {
        return this.api.get(urls.content.promotion);
    }
    _getRecentTopics(): Observable<Topic[]> {
        return this.api.get(urls.content.recentTopic);
    }
    _getTopicList(search: string, filter: TopicFilter, paging: Paging): Observable<Topic[]> {
        const up = new URLSearchParams();
        if (filter.categoryIds.length > 0) {
            up.set('cids', filter.categoryIds.join(','));
        }
        if (paging.pageIndex > 0) {
            up.set('page', paging.pageIndex.toString());
        }
        if (paging.pageTake > 0) {
            up.set('take', paging.pageTake.toString());
        }
        if (search) {
            up.set('s', search);
        }
        return this.api.get(urls.content.topic, up);
    }
    // _getTopic(id: string): Observable<Topic> {
    //     //return this.api.getCache<Topic>(urls.content.topic + '/' + id);
    // }

    _getRoles(): Observable<Role[]> {
        return this.api.get(urls.user.role);
    }

    _getTempTopic(): Observable<TempTopic> {
        return this.api.get(urls.content.tempTopic);
    }
    _saveTempTopic(topic: TempTopic): Observable<void> {
        return this.api.put(urls.content.tempTopic, topic);
    }

}
