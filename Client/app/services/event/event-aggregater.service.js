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
var event_base_1 = require("./event-base");
/// 似乎不应该增加加载代码体积
var EventAggregaterService = (function () {
    function EventAggregaterService() {
        this.events = {};
    }
    // GetEvent<T extends Eventbase>(type: { new (): T }, key: string): T {
    //   let e = this.events[key];
    //   if (e) { return e as T; }
    //   this.events[key] = new type();
    //   return this.events[key] as T;
    // }
    EventAggregaterService.prototype.GetEvent = function (key) {
        var e = this.events[key];
        if (e) {
            return e;
        }
        this.events[key] = new event_base_1.PubSubEvent();
        return this.events[key];
    };
    return EventAggregaterService;
}());
EventAggregaterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], EventAggregaterService);
exports.EventAggregaterService = EventAggregaterService;
//# sourceMappingURL=event-aggregater.service.js.map