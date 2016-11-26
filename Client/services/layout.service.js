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
var Subject_1 = require("rxjs/Subject");
// import { PubSubEvent, EventAggregaterService } from './event';
var LayoutService = (function () {
    function LayoutService(zone) {
        var _this = this;
        this.layoutChangeSource = new Subject_1.Subject();
        this.layoutChanged$ = this.layoutChangeSource.asObservable();
        this.currentLayout = this.width2Layout();
        // window.addEventListener('resize', event => {
        //   zone.run(() => {
        //     this.currentLayout = this.width2Layout();
        //   });
        // });
        window.addEventListener('resize', function (event) {
            _this.currentLayout = _this.width2Layout();
        });
    }
    Object.defineProperty(LayoutService.prototype, "currentLayout", {
        get: function () {
            console.log('get _layout : ' + this._layout);
            return this._layout;
        },
        set: function (value) {
            console.log('set _layout : ' + value);
            this._layout = value;
            this.layoutChangeSource.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    LayoutService.prototype.width2Layout = function () {
        console.log('window.innerWidth => ' + window.innerWidth);
        if (window.innerWidth > 1000) {
            return Layout.Wide;
        }
        return Layout.Narrow;
    };
    return LayoutService;
}());
LayoutService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], LayoutService);
exports.LayoutService = LayoutService;
(function (Layout) {
    Layout[Layout["Wide"] = 0] = "Wide";
    Layout[Layout["Medium"] = 1] = "Medium";
    Layout[Layout["Narrow"] = 2] = "Narrow";
})(exports.Layout || (exports.Layout = {}));
var Layout = exports.Layout;
//# sourceMappingURL=layout.service.js.map