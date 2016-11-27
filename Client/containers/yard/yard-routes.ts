import { Route } from '@angular/router';
import { AuthService } from 'app-shared';
import { YardComponent, DetailComponent, PublishComponent } from 'app-containers';

export const ROUTES: Route[] = [
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
];
