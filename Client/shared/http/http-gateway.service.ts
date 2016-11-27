// ** HttpGateway **

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeLast';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store, Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { CacheService, AuthService } from 'app-shared';

export class ApiGatewayOptions {
    method: RequestMethod;
    url: string;
    headers: any = {};
    params = {};
    data = {};
}

@Injectable()
export class ApiGatewayService {

    // Define the internal Subject we'll use to push the command count
    private pendingCommandsSubject = new Subject<number>();
    private pendingCommandCount = 0;

    // Provide the *public* Observable that clients can subscribe to
    private pendingCommands$: Observable<number>;

    private refreshTimes: number = 0;

    constructor(
        private http: Http,
        private cache: CacheService,
        private auth: AuthService,
        private actions$: Actions
    ) {
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    // Http overrides 
    // -------------------

    getCache<T>(url: string, params?: any, autoClear: boolean = true): Observable<T> {
        let key = url;
        if (this.cache.has(key)) {
            const cachedResponse = this.cache.get(key);
            // if autoClear is set to false, item will stay in cache until you manually clear it
            // ie: trigger CacheService.remove(url /* with the url/key used here */)
            if (autoClear) {
                // remove previous value automatically for now
                this.cache.remove(key);
            }
            return Observable.of(cachedResponse);
        }
        // note: you probably shouldn't .share() and you should write the correct logic
        return this.get<T>(url)
            .do(data => { this.cache.set(key, data); })
            .share();
    }

    get<T>(url: string, params?: any): Observable<T> {
        let options = new ApiGatewayOptions();
        options.url = url;
        options.params = params;
        return this.request<T>(options);
    }

    post<T>(url: string, data?: any, params?: any): Observable<T> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request<T>(options);
    }
    // postForm(url: string, )

    put<T>(url: string, data?: any, params?: any): Observable<T> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request<T>(options);
    }

    delete<T>(url: string, params?: any): Observable<T> {
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Delete;
        options.url = url;
        options.params = params;
        return this.request<T>(options);
    }


    // Internal methods
    // --------------------

    private request<T>(options: ApiGatewayOptions): Observable<T> {
        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});

        this.interpolateUrl(options);
        this.addXsrfToken(options);
        this.addContentType(options);
        this.addBearerToken(options);

        let requestOptions = new RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = JSON.stringify(options.data);

        let isCommand = (options.method !== RequestMethod.Get);

        if (isCommand) {
            this.pendingCommandsSubject.next(++this.pendingCommandCount);
        }

        let stream = this.http.request(options.url, requestOptions)
            .map(value => value.json() as T)
            .catch((error, source) => {
                if (error.status === 401) {
                    if (this.refreshTimes < 1) {
                        this.refreshTimes++;
                        return this.auth._refresh().switchMap(u => source);
                    } else { this.refreshTimes = 0; }
                    return error;
                }
                if (error.status === 400)
                    return error.json();
                return ({
                    code: -1,
                    message: 'An unexpected error occurred.'
                });
            })
            .finally(() => {
                if (isCommand) {
                    this.pendingCommandsSubject.next(--this.pendingCommandCount);
                }
            });

        return stream;
    }


    private addContentType(options: ApiGatewayOptions): ApiGatewayOptions {
        if (options.method !== RequestMethod.Get) {
            options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        }
        return options;
    }

    private addBearerToken(options: ApiGatewayOptions): ApiGatewayOptions {
        if (sessionStorage.getItem('accessToken')) {
            options.headers.Authorization = 'Bearer ' + sessionStorage.getItem('accessToken');
        }
        return options;
    }

    private extractValue(collection: any, key: string): any {
        let value = collection[key];
        delete (collection[key]);
        return value;
    }

    private addXsrfToken(options: ApiGatewayOptions): ApiGatewayOptions {
        let xsrfToken = this.getXsrfCookie();
        if (xsrfToken) {
            options.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
        return options;
    }

    private getXsrfCookie(): string {
        let matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return (matches && decodeURIComponent(matches[1]));
        } catch (decodeError) {
            return ('');
        }
    }

    private addCors(options: ApiGatewayOptions): ApiGatewayOptions {
        options.headers['Access-Control-Allow-Origin'] = '*';
        return options;
    }

    private buildUrlSearchParams(params: any): URLSearchParams {
        let searchParams = new URLSearchParams();
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    }

    private interpolateUrl(options: ApiGatewayOptions): ApiGatewayOptions {
        options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, ($0, token) => {
            // Try to move matching token from the params collection.
            if (options.params.hasOwnProperty(token)) {
                return (this.extractValue(options.params, token));
            }
            // Try to move matching token from the data collection.
            if (options.data.hasOwnProperty(token)) {
                return (this.extractValue(options.data, token));
            }
            // If a matching value couldn't be found, just replace
            // the token with the empty string.
            return ('');
        });
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, '/');
        // Clean up any trailing slashes.
        options.url = options.url.replace(/\/+$/g, '');

        return options;
    }

}
