import { Headers, Http, RequestMethod, RequestOptions, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';

import { AuthService } from "@app/services";
import { CacheService } from './universal-cache';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { XError } from '@app/models';

@Injectable()
export class ApiGatewayService {
    constructor(
        private http: Http,
        private auth: AuthService,
        private router: Router,
        private cache: CacheService,
    ) { }

    private hasRetried = false;

    // Http overrides
    // -------------------

    // getCache<T>(url: string, search?: URLSearchParams, autoClear: boolean = true): Observable<T> {
    //     let key = url;
    //     if (this.cache.has(key)) {
    //         const cachedResponse = this.cache.get(key);
    //         if (autoClear) {
    //             this.cache.remove(key);
    //         }
    //         return Observable.of<T>(cachedResponse);
    //     }
    //     return this.get<T>(url)
    //         .do(data => { this.cache.set(key, data); })
    //         .share();
    // }

    get(url: string, search?: URLSearchParams) {
        return this.request(url, { method: RequestMethod.Get, search }).map(v => v.json());
    }
    post(url: string, data?: any) {
        return this.request(url, { method: RequestMethod.Post }, data).map(v => v.json());
    }
    put(url: string, data?: any) {
        return this.request(url, { method: RequestMethod.Put }, data).map(v => v.json());
    }
    delete(url: string) {
        return this.request(url, { method: RequestMethod.Delete });
    }

    upload(url: string, name: string, file: any): Observable<any> {
        const formData = new FormData();
        formData.append(name, file, file.name);
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, formData, options)
            .catch((err, cau) => {
                if (err.status === 401) {
                    return this.auth._refresh(localStorage.getItem('refreshToken'))
                        .concatMap(v => this.upload(url, name, file))
                        .catch(() => Observable.fromPromise(this.router.navigate(["/auth/login"])));
                }
            });
    }

    private request(url: string, options: RequestOptionsArgs, data?: Object): Observable<Response> {

        // this.interpolateUrl(options);
        // this.addXsrfToken(options);
        // this.addContentType(options);
        // this.addBearerToken(options);
        // this.addCors(options);

        options.headers = new Headers();

        let accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            options.headers.append("Authorization", `Bearer ${accessToken}`);
        }

        if (options.method === RequestMethod.Post || options.method === RequestMethod.Put) {
            options.headers.append("Content-Type", "application/json");
        }

        if (data) {
            options.body = JSON.stringify(data);
        }
        return this.http.request(options.url, options)
            .catch((err, cau) => {
                if (err.status === 401) {
                    return this.auth._refresh(localStorage.getItem('refreshToken'))
                        .flatMap(v => this.request(url, options, data))
                        .catch(err => {
                            localStorage.clear();
                            sessionStorage.clear();
                            this.router.navigate(["/auth/login"]);
                            return Observable.throw(err);
                        });
                }
                if (err.status === 400) {
                    return Observable.throw(err.json() as XError)
                }
                return Observable.throw({});
            });
    }

    private getXsrfCookie(): string {
        let matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return (matches && decodeURIComponent(matches[1]));
        } catch (decodeError) {
            return ('');
        }
    }

}
