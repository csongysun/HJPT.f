import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YardComponent } from './yard.component';

import { AuthService } from 'app-shared';

// import { IndexComponent } from './index/index.component';
// import { TorrentComponent } from './torrent/torrent.component';
import { DetailComponent, PublishComponent } from 'app-containers';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: YardComponent,
                canActivate: [AuthService],
                children: [
                    {
                        path: '',
                        // canActivateChild: [AuthService],
                        redirectTo: '/index',
                        pathMatch: 'full'
                    },
                    {
                        path: 'index',
                        loadChildren: 'app/yard/index/index.module#IndexModule'
                        // component: IndexComponent C:\Users\csong\Source\Repo\HJPT\src\app\yard\index\index.module.ts
                    },
                    {
                        path: 'torrents',
                        loadChildren: 'app/yard/torrent/torrent.module#TorrentModule'
                    },
                    {
                        path: 'detail/:id',
                        component: DetailComponent
                    },
                    {
                        path: 'publish',
                        component: PublishComponent
                    }
                ]

            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class YardRoutingModule { }
