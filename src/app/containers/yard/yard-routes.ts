import { DetailComponent, IndexComponent, PublishComponent, TorrentComponent, YardComponent } from '@app/containers';

import { AuthService } from '@app/services';
import { Route } from '@angular/router';

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
                path: 'topic',
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
