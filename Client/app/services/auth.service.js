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
var api_request_service_1 = require("./api-request.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var app_client_service_1 = require("./app-client.service");
require("../rxjs-operators");
var AuthService = (function () {
    function AuthService(api, app, router) {
        this.api = api;
        this.app = app;
        this.router = router;
        this.loginUrl = '';
        this.signUpUrl = '';
        this.refreshUrl = '';
    }
    AuthService.prototype.Login = function (key, password) {
        var _this = this;
        return Observable_1.Observable.of(this.GetMockUser()).map(function (user) {
            if (user) {
                _this.app.currentUser = user;
                localStorage.setItem('refresh_token', 'mock_refresh_token');
                localStorage.setItem('token', 'mock_token');
            }
        });
        // let loginContent = {
        //   UserKey: key,
        //   Password: password
        // };
        // return this.api.Request<User>(this.loginUrl, JSON.stringify(loginContent), RequestMethod.Post);
    };
    AuthService.prototype.Logout = function () {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token');
        return Observable_1.Observable.of(null);
    };
    AuthService.prototype.Refresh = function () {
        var _this = this;
        console.log('refresh');
        this.app.currentUser = null;
        localStorage.removeItem('token');
        var rtoken = localStorage.getItem('refresh_token');
        if (!rtoken || rtoken !== 'mock_refresh_token') {
            this.router.navigate(['/auth']);
            console.log('rtoken wrong or null');
            return Observable_1.Observable.of(false);
        }
        localStorage.setItem('token', 'mock_token');
        this.app.currentUser = this.GetMockUser();
        return Observable_1.Observable.of(this.GetMockUser()).map(function (u) {
            if (u) {
                return true;
            }
        }).catch(function (err, caught) {
            console.log('caught refresh err => ' + err);
            _this.router.navigate(['/auth']);
            return Observable_1.Observable.of(false);
        });
        // return this.api.Request<UserRes>(this.refreshUrl + '/' + refreshToken, null, RequestMethod.Get)
        // .map((user: UserRes) => {
        //   localStorage.setItem('token', user.Token);
        //   this.app.currentUser = user.ToModel();
        //   return true;
        // });
    };
    AuthService.prototype.RefreshTest = function () {
        console.log('refresh');
        this.app.currentUser = null;
        localStorage.removeItem('token');
        var rtoken = localStorage.getItem('refresh_token');
        if (!rtoken) {
            this.router.navigate(['/auth']);
            // return Observable.of(false);
            // Observable.throw(new Error('refresh test error'));
            console.log('rtoken wrong or null');
            return Observable_1.Observable.of(this.GetMockUser()).map(function (user) {
                throw new Error('refresh test error');
            });
        }
        localStorage.setItem('token', 'mock_token');
        this.app.currentUser = this.GetMockUser();
        return Observable_1.Observable.of(this.GetMockUser());
    };
    AuthService.prototype.Register = function (model) {
        // 加密 password
        return this.api.RequestNoContent(this.signUpUrl, model, http_1.RequestMethod.Post);
    };
    AuthService.prototype.GetMockUser = function () {
        // Mock User
        var mockUser = {
            Id: '0001',
            Nickname: 'szf',
            Email: 'test@test',
            StuId: 'stu0001',
        };
        return mockUser;
    };
    AuthService.prototype.canActivate = function (next, state) {
        console.log('check user => ' + this.app.currentUser);
        if (this.app.currentUser == null) {
            return this.Refresh();
        }
        else {
            console.log('check login suc ' + this.app.currentUser);
            return Observable_1.Observable.of(true);
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_request_service_1.ApiRequestService,
        app_client_service_1.AppClientService,
        router_1.Router])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map