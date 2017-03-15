import { Action, Dispatcher, Store } from '@ngrx/store';
import { Headers, Http, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Actions } from '@ngrx/effects';
import { CacheService } from './universal-cache';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class ApiGatewayOptions {
    method: RequestMethod;
    url: string;
    headers: any = {};
    params = {};
    data = {};
}

@Injectable()
export class ApiGatewayService {
    constructor(
        private http: Http,
        private cache: CacheService,
    ) { }

    // Http overrides
    // -------------------

    getCache<T>(url: string, params?: any, autoClear: boolean = true): Observable<T> {
        let key = url;
        if (this.cache.has(key)) {
            const cachedResponse = this.cache.get(key);
            if (autoClear) {
                this.cache.remove(key);
            }
            return Observable.of<T>(cachedResponse);
        }
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

    upload<T>(url: string, name: string, file: any): Observable<T> {
        const formData = new FormData();
        formData.append(name, file, file.name);
        const headers = new Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'));
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, formData, options)
            .map(value => value.json() as T)
            .catch(error => Observable.throw(error));
    }

    private request<T>(options: ApiGatewayOptions): Observable<T> {

        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});

        // this.interpolateUrl(options);
        // this.addXsrfToken(options);
        this.addContentType(options);

        this.addBearerToken(options);
        this.addCors(options);

        const requestOptions = new RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = JSON.stringify(options.data);

        console.log(requestOptions);

        return this.http.request(options.url, requestOptions)
            .map(value => value.json() as T);
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
            if (params.hasOwnProperty(key) && params[key]) {
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
