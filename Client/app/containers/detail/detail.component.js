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
var app_client_service_1 = require("../../service/app-client.service");
var DetailComponent = (function () {
    function DetailComponent(elementRef, app) {
        this.elementRef = elementRef;
        this.app = app;
    }
    DetailComponent.prototype.ngOnInit = function () {
        this.app.currentPage = '详情';
    };
    DetailComponent.prototype.ngAfterViewInit = function () {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.textContent = "$(document).ready(function(){$('.collapsible').collapsible();});";
        this.elementRef.nativeElement.appendChild(s);
    };
    return DetailComponent;
}());
DetailComponent = __decorate([
    core_1.Component({
        selector: 'app-detail',
        templateUrl: './detail.component.html',
        styleUrls: ['./detail.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        app_client_service_1.AppClientService])
], DetailComponent);
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=detail.component.js.map