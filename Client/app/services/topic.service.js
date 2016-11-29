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
var Observable_1 = require("rxjs/Observable");
var topic_1 = require("../model/topic");
var TopicService = (function () {
    function TopicService(api) {
        this.api = api;
    }
    TopicService.prototype.GetRecentTopics = function () {
        return Observable_1.Observable.of(this.GetMockTopics());
    };
    TopicService.prototype.GetMockTopics = function () {
        var topics = [];
        for (var i = 0; i < 20; ++i) {
            var topic = new topic_1.Topic();
            topic.Id = '0001';
            topic.Title = '现代战争+汉化正式版0.15.3';
            topic.SubTitle = 'Hearts.of.Iron.IV.CHS.Patch.v5.0-3DM';
            topic.Torrent = {
                Seeder: 100,
                Leecher: 50,
                Saver: 400
            };
            topics.push(topic);
        }
        return topics;
    };
    return TopicService;
}());
TopicService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_request_service_1.ApiRequestService])
], TopicService);
exports.TopicService = TopicService;
//# sourceMappingURL=topic.service.js.map