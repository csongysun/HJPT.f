import { Route } from '@angular/router';
import { AuthService } from 'app-services';
import { YardComponent, IndexComponent, TorrentComponent, DetailComponent, PublishComponent } from 'app-containers';

export const ROUTES: Route[] = [
    {
        path: '',
        component: YardComponent,
        canActivate: [AuthService],
        children: [
            {
                path: '',
                redirectTo: 'index',
                pathMatch: 'full'
            },
            {
                path: 'index',
                component: IndexComponent
            },
            {
                path: 'torrents',
                component: TorrentComponent
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
