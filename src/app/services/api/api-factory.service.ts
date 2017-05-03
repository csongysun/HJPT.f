import * as urls from './urls';

import {
    ApiGatewayService,
    ToastService,
} from '@app/services';
import {
    Category,
    Paging,
    Promotion,
    Role,
    TempTopic,
    Topic,
    TopicFilter,
    TopicListRes,
    TopicRes,
    TopicsRep,
    UserRoleReq,
} from '@app/models';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TopicListQuery } from '@app/models';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ApiFactoryService {

    constructor(
        private api: ApiGatewayService,
        private toast: ToastService
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

    _loadTopicList(search: string, filter: TopicFilter, cursor?: string): Observable<TopicListRes> {
        const up = new URLSearchParams();
        if (filter && filter.categoryIds.length > 0) {
            up.set('cids', filter.categoryIds.join(','));
        }
        up.set('cursor', cursor);
        if (search) {
            up.set('s', search);
        }
        return this.api.get(urls.content.topic, up);
    }
    _getTopic(id: number): Observable<TopicRes> {
        return this.api.get(urls.content.topic + '/' + id);
    }

    _getRoles(): Observable<Role[]> {
        return this.api.get(urls.user.role);
    }

    _getTempTopic(): Observable<TempTopic> {
        return this.api.get(urls.content.tempTopic);
    }
    _saveTempTopic(topic: TempTopic): Observable<void> {
        return this.api.put(urls.content.tempTopic, topic);
    }
    _publishTopic(topic: TempTopic): Observable<void> {
        return this.api.post(urls.content.publishTopic, topic);
    }

    _putEditTopic(topic: TempTopic): Observable<void> {
        return this.api.put(urls.content.topic, topic);
    }

    _downloadTorrent(id: number, filename?:string) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', urls.content.torrent + '/' + id, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        xhr.onload = function (e) {
            if (xhr.status == 200) {
                var blob = xhr.response;
                var a = document.createElement('a');
                a.onload = function (e) {
                    window.URL.revokeObjectURL(a.href); // Clean up after yourself.
                };
                a.download = filename || 'download.torrent';
                a.href = window.URL.createObjectURL(blob);
                a.click();
            }
        };
        xhr.send();
    }

    _postAddUserToRole(req: UserRoleReq){
        return this.api.put(urls.user.addRole,  req);
    }
    _postRemoveUserFromRole(req: UserRoleReq){
        return this.api.put(urls.user.removeRole,  req);
    }

    _getUserInfo(key: string){
        return this.api.get(urls.user.info + '/' + key);
    }
}
