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
var topic_service_1 = require("../../service/topic.service");
var TorrentComponent = (function () {
    function TorrentComponent(app, topic) {
        this.app = app;
        this.topic = topic;
        this.currentPageIndex = 1;
        this.pageCount = 10;
    }
    TorrentComponent.prototype.getPages = function () {
        var ps = [];
        if (this.currentPageIndex < 4) {
            for (var i = 1; i <= (this.pageCount < 7 ? this.pageCount : 7); i++) {
                ps.push(i);
            }
        }
        else if (this.currentPageIndex > this.pageCount - 4) {
            ps = [this.pageCount - 6,
                this.pageCount - 5,
                this.pageCount - 4,
                this.pageCount - 3,
                this.pageCount - 2,
                this.pageCount - 1,
                this.pageCount];
        }
        else {
            ps = [this.currentPageIndex - 3,
                this.currentPageIndex - 2,
                this.currentPageIndex - 1,
                this.currentPageIndex,
                this.currentPageIndex + 1,
                this.currentPageIndex + 2,
                this.currentPageIndex + 3];
        }
        return ps;
    };
    TorrentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app.currentPage = '种子';
        this.topic.GetRecentTopics().subscribe(function (topics) {
            _this.topics = topics;
            _this.setPage(1);
        });
    };
    TorrentComponent.prototype.setPage = function (index) {
        // if (index === this.currentPageIndex) { return; }
        this.currentPageIndex = index;
        // if (this.pages !== this.getPages()) { this.pages = this.getPages(); }
    };
    return TorrentComponent;
}());
TorrentComponent = __decorate([
    core_1.Component({
        selector: 'app-torrent',
        templateUrl: './torrent.component.html',
        styleUrls: ['./torrent.component.scss']
    }),
    __metadata("design:paramtypes", [app_client_service_1.AppClientService,
        topic_service_1.TopicService])
], TorrentComponent);
exports.TorrentComponent = TorrentComponent;
//# sourceMappingURL=torrent.component.js.map