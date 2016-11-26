// ** HttpGateway **

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { CacheService, AuthService } from 'app-shared';
import * as fromRoot from 'app-states';
import { appAction } from 'app-actions';

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

    constructor(
        private http: Http,
        private router: Router,
        private cache: CacheService,
        private store: Store<fromRoot.State>
    ) {
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    // Http overrides 
    // -------------------

    getCache(url: string, params?: any, autoClear: boolean = true): Observable<any> {
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
        return this.get(url)
            .do(json => { this.cache.set(key, json); })
            .share();
    }

    get(url: string, params?: any): Observable<any> {
        let options = new ApiGatewayOptions();
        options.url = url;
        options.params = params;
        return this.request(options);
    }

    post(url: string, data?: any, params?: any): Observable<any> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    }
    // postForm(url: string, )

    put(url: string, data?: any, params?: any): Observable<any> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    }

    delete(url: string, params?: any): Observable<any> {
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Delete;
        options.url = url;
        options.params = params;
        return this.request(options);
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
            .finally(() => {
                if (isCommand) {
                    this.pendingCommandsSubject.next(--this.pendingCommandCount);
                }
            });

        return this.fuck(stream);
    }

    private fuck<T>(source: Observable<T>, first: boolean = true): Observable<T> {
        return source
            .catch((error, source) => {
                if (error.status === 401 && first) {
                    this.store.dispatch(new appAction.refreshAction(this.fuck(source, false)));
                    return error;
                }
                if (error.status === 400)
                    return error.json();
                return ({
                    code: -1,
                    message: 'An unexpected error occurred.'
                });
            });
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

