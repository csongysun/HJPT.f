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
var auth_service_1 = require("../service/auth.service");
// import { AppClientService } from '../service/app-client.service';
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var AuthComponent = (function () {
    function AuthComponent(auth, 
        // private app: AppClientService,
        router, snackBar) {
        this.auth = auth;
        this.router = router;
        this.snackBar = snackBar;
        this.isLog = true;
        this.astate = 'in';
        this.bstate = 'bout';
    }
    AuthComponent.prototype.toggle = function () {
        if (this.isLog) {
            this.astate = 'aout';
            this.bstate = 'in';
        }
        else {
            this.astate = 'in';
            this.bstate = 'bout';
        }
        console.log('toggle');
        this.isLog = !this.isLog;
    };
    AuthComponent.prototype.ngOnInit = function () {
    };
    AuthComponent.prototype.login = function () {
        var _this = this;
        console.log('login');
        this.auth.Login(this.UserKey, this.Password)
            .subscribe(function () {
            console.log('login suc');
            _this.router.navigate(['/']);
        }, function (err) {
            // send error message
            // let errMsg = <string> err.message;
            console.log(err);
            _this.snackBar.open(err, 'OK', null);
        });
    };
    AuthComponent.prototype.register = function () {
        var _this = this;
        var requestModel = {
            UserName: this.UserKey,
            Password: this.Password,
            Email: this.Email,
            StuID: this.StuId,
            InviteToken: this.InviteToken,
        };
        this.auth.Register(requestModel).subscribe(function (data) {
            _this.login();
        }, function (err) {
            _this.snackBar.open(err, 'OK', null);
        });
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    core_1.Component({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.css'],
        animations: [
            core_1.trigger('routeAnimations', [
                core_1.state('in', core_1.style({ right: 0, left: 0, opacity: 1 })),
                core_1.state('bout', core_1.style({ right: 0, left: '30%', opacity: 0 })),
                core_1.state('aout', core_1.style({ right: '30%', left: 0, opacity: 0 })),
                core_1.transition('aout <=> in', core_1.animate('200ms ease')),
                core_1.transition('bout <=> in', core_1.animate('200ms ease')),
                core_1.transition('void => in', core_1.animate(0)),
            ])
        ],
        providers: [
            material_1.MdSnackBar,
        ]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router,
        material_1.MdSnackBar])
], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map