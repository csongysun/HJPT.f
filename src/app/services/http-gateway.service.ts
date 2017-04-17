import * as urls from './api/urls';

import { Headers, Http, RequestMethod, RequestOptions, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { User, XError } from '@app/models';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ApiGatewayService {
    constructor(
        private http: Http,
        private router: Router,
    ) { }

    private hasRetried = false;

    get(url: string, search?: URLSearchParams) {
        return this.request(url, { method: RequestMethod.Get, search });
    }
    post(url: string, data?: any) {
        return this.request(url, { method: RequestMethod.Post }, data);
    }
    put(url: string, data?: any) {
        return this.request(url, { method: RequestMethod.Put }, data);
    }
    delete(url: string) {
        return this.request(url, { method: RequestMethod.Delete });
    }

    upload(url: string, name: string, file: any): Observable<any> {
        const formData = new FormData();
        formData.append(name, file, file.name);
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, formData, options)
            .map(res => res.json())
            .catch((err, cau) => {
                if (err.status === 401) {
                    if (!localStorage.getItem('refreshToken')) {
                        localStorage.clear();
                        this.router.navigate(['/auth/login']);
                        return Observable.throw('认证失败');
                    }
                    return this.refreshShadow$
                        .concatMap(v => this.upload(url, name, file))
                        .catch(e => {
                            localStorage.clear();
                            this.router.navigate(['/auth/login']);
                            return Observable.throw(e);
                        });
                }
                if (err.status === 400) {
                    return Observable.throw(err.json() as XError);
                }
                return Observable.throw({});
            });
    }

    private request(url: string, options: RequestOptionsArgs, data?: Object) {

        // this.interpolateUrl(options);
        // this.addXsrfToken(options);
        // this.addContentType(options);
        // this.addBearerToken(options);
        // this.addCors(options);

        options.headers = new Headers();

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            options.headers.append('Authorization', `Bearer ${accessToken}`);
        }
        if (options.method === RequestMethod.Post || options.method === RequestMethod.Put) {
            options.headers.append('Content-Type', 'application/json');
        }
        if (data) {
            options.body = JSON.stringify(data);
        }
        return this.http.request(url, options)
            .map(v => v.json())
            .catch((err, cau) => {
                if (err.status === 401) {
                    if (!localStorage.getItem('refreshToken')) {
                        localStorage.clear();
                        this.router.navigate(['/auth/login']);
                        return Observable.throw('认证失败');
                    }
                    return this.refreshShadow$
                        .flatMap(v => this.http.request(url, options)).map(v => v.json())
                        .catch(e => {
                            localStorage.clear();
                            this.router.navigate(['/auth/login']);
                            return Observable.throw(e);
                        });
                }
                if (err.status === 400) {
                    return Observable.throw(err.json() as XError);
                }
                return Observable.throw({});
            });
    }

    private getXsrfCookie(): string {
        const matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return (matches && decodeURIComponent(matches[1]));
        } catch (decodeError) {
            return ('');
        }
    }

    get refreshShadow$(): Observable<void> {
        const rtoken = localStorage.getItem('refreshToken');
        return this.get(urls.auth.refresh + `?token=${rtoken}`)
            .map(v => {
                if (!this.setCurrentUser)
                    throw new Error('setCurrentUser not set');
                this.setCurrentUser(v);
            });
    }

    setCurrentUser: (v: User) => void;

}
