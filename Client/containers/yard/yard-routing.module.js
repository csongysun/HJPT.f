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
var router_1 = require("@angular/router");
var yard_component_1 = require("./yard.component");
var auth_service_1 = require("../service/auth.service");
// import { IndexComponent } from './index/index.component';
// import { TorrentComponent } from './torrent/torrent.component';
var detail_component_1 = require("./detail/detail.component");
var publish_component_1 = require("./publish/publish.component");
var YardRoutingModule = (function () {
    function YardRoutingModule() {
    }
    return YardRoutingModule;
}());
YardRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild([
                {
                    path: '',
                    component: yard_component_1.YardComponent,
                    canActivate: [auth_service_1.AuthService],
                    children: [
                        {
                            path: '',
                            // canActivateChild: [AuthService],
                            redirectTo: '/index',
                            pathMatch: 'full'
                        },
                        {
                            path: 'index',
                            loadChildren: 'app/yard/index/index.module#IndexModule',
                        },
                        {
                            path: 'torrents',
                            loadChildren: 'app/yard/torrent/torrent.module#TorrentModule',
                        },
                        {
                            path: 'detail/:id',
                            component: detail_component_1.DetailComponent
                        },
                        {
                            path: 'publish',
                            component: publish_component_1.PublishComponent
                        }
                    ]
                }
            ])
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: []
    }),
    __metadata("design:paramtypes", [])
], YardRoutingModule);
exports.YardRoutingModule = YardRoutingModule;
//# sourceMappingURL=yard-routing.module.js.map