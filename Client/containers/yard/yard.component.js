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
var app_client_service_1 = require("../service/app-client.service");
var layout_service_1 = require("../service/layout.service");
var YardComponent = (function () {
    function YardComponent(app, layout) {
        var _this = this;
        this.app = app;
        this.layout = layout;
        this.naviList = [
            { Name: '主页', Icon: null, url: '/index' },
            { Name: '种子', Icon: null, url: '/torrents' },
            { Name: '发布', Icon: null, url: '/publish' },
            { Name: '规则', Icon: null, url: '/index' },
        ];
        this.currentUser = app.currentUser;
        this.isWide = layout.currentLayout === layout_service_1.Layout.Wide;
        layout.layoutChanged$.subscribe(function (value) {
            if ((value === layout_service_1.Layout.Wide) !== _this.isWide) {
                _this.isWide = layout.currentLayout === layout_service_1.Layout.Wide;
            }
        });
    }
    YardComponent.prototype.ngOnInit = function () {
    };
    YardComponent.prototype.onLayoutChanged = function (layout) {
        if ((layout === layout_service_1.Layout.Wide) === this.isWide) {
            return;
        }
        // this.zone.run(() => this.isWide = this.layout.currentLayout === Layout.Wide);
        console.log('now this => ' + this.isWide);
        this.isWide = this.layout.currentLayout === layout_service_1.Layout.Wide;
        console.log('update isWide => ' + this.isWide);
        // if (layout === Layout.Wide) {
        //   this.isWide = true;
        //   // this.sideMode = 'side';
        //   // this.showHam = false;
        // } else {
        //   this.isWide = false;
        //   // this.sideMode = 'over';
        //   // this.showHam = true;
        // }
    };
    return YardComponent;
}());
YardComponent = __decorate([
    core_1.Component({
        selector: 'app-yard',
        templateUrl: './yard.component.html',
        styleUrls: ['./yard.component.scss']
    }),
    __metadata("design:paramtypes", [app_client_service_1.AppClientService,
        layout_service_1.LayoutService])
], YardComponent);
exports.YardComponent = YardComponent;
var NaviItem = (function () {
    function NaviItem() {
    }
    return NaviItem;
}());
//# sourceMappingURL=yard.component.js.map