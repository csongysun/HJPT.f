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
var topic_service_1 = require("../../service/topic.service");
var TopicScrollerComponent = (function () {
    function TopicScrollerComponent(topic) {
        this.topic = topic;
    }
    TopicScrollerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.topic.GetRecentTopics().subscribe(function (topics) {
            _this.topics = topics;
        });
    };
    return TopicScrollerComponent;
}());
TopicScrollerComponent = __decorate([
    core_1.Component({
        selector: 'topic-scroller',
        templateUrl: './topic-scroller.component.html',
        styleUrls: ['./topic-scroller.component.scss']
    }),
    __metadata("design:paramtypes", [topic_service_1.TopicService])
], TopicScrollerComponent);
exports.TopicScrollerComponent = TopicScrollerComponent;
//# sourceMappingURL=topic-scroller.component.js.map