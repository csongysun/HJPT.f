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
var AppClientService = (function () {
    function AppClientService() {
    }
    Object.defineProperty(AppClientService.prototype, "currentUser", {
        get: function () {
            return this._currentUser;
        },
        set: function (v) {
            //publish userinfo changed event
            this._currentUser = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppClientService.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (v) {
            this._currentPage = v;
        },
        enumerable: true,
        configurable: true
    });
    return AppClientService;
}());
AppClientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppClientService);
exports.AppClientService = AppClientService;
//# sourceMappingURL=app-client.service.js.map