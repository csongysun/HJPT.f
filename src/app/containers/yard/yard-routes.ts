import {
    DetailComponent,
    IndexComponent,
    ManageComponent,
    PublishComponent,
    TopicEditComponent,
    TorrentComponent,
    YardComponent,
} from '@app/containers';

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
                path: 'topic/edit',
                component: TopicEditComponent
            },
            {
                path: 'detail/:id',
                component: DetailComponent
            },
            {
                path: 'publish',
                component: PublishComponent
            },
            {
                path: 'manage',
                component: ManageComponent
            }
        ]

    }
];
