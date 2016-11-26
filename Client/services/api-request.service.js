"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApiRequestService = (function () {
    function ApiRequestService(http) {
        this.http = http;
        this.header = new http_1.Headers();
        this.requestOptions = new http_1.RequestOptions();
    }
    ApiRequestService.prototype.SetToken = function (token) {
        this.header.append('Auth', 'Bearer ' + token);
        this.header.append('Content-Type', 'application/json');
        this.header.append('Accept', 'application/json');
        this.requestOptions.headers = this.header;
    };
    ApiRequestService.prototype.Request = function (url, content, method) {
        this.requestOptions.method = method;
        this.requestOptions.url = url;
        if (content) {
            this.requestOptions.body = JSON.stringify(content);
        }
        return this.http.request(new http_1.Request(this.requestOptions))
            .map(function (res) {
            if (res) {
                var body = res.json();
                if (!body) {
                    throw new Error('response parse failed');
                }
                if (res.status === 200) {
                    return body;
                }
                if (res.status === 301) {
                    throw new Error(body[0].Code);
                }
                else {
                    throw new Error('Unkown Error');
                }
            }
        });
    };
    ApiRequestService.prototype.RequestNoContent = function (url, content, method) {
        this.requestOptions.method = method;
        this.requestOptions.url = url;
        if (content) {
            this.requestOptions.body = JSON.stringify(content);
        }
        return this.http.request(new http_1.Request(this.requestOptions))
            .map(function (res) {
            if (res) {
                if (res.status === 301) {
                    var body = res.json() || '';
                    throw new Error(body[0].Code);
                }
                if (res.status !== 204) {
                    throw new Error('Unkown Error');
                }
            }
        });
    };
    return ApiRequestService;
}());
ApiRequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiRequestService);
exports.ApiRequestService = ApiRequestService;
//# sourceMappingURL=api-request.service.js.map