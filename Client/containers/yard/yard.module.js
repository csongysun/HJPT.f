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
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var yard_component_1 = require("./yard.component");
var yard_routing_module_1 = require("./yard-routing.module");
// import { TopicScrollerComponent } from './topic-scroller/topic-scroller.component';
var layout_service_1 = require("../service/layout.service");
var topic_service_1 = require("../service/topic.service");
var user_info_component_1 = require("./user-info/user-info.component");
var detail_component_1 = require("./detail/detail.component");
var publish_component_1 = require("./publish/publish.component");
var YardModule = (function () {
    function YardModule() {
    }
    return YardModule;
}());
YardModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            yard_routing_module_1.YardRoutingModule,
            material_1.MaterialModule.forRoot(),
        ],
        declarations: [
            yard_component_1.YardComponent,
            user_info_component_1.UserInfoComponent,
            detail_component_1.DetailComponent,
            publish_component_1.PublishComponent,
        ],
        providers: [
            layout_service_1.LayoutService,
            topic_service_1.TopicService,
        ]
    }),
    __metadata("design:paramtypes", [])
], YardModule);
exports.YardModule = YardModule;
//# sourceMappingURL=yard.module.js.map