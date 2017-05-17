import {
    DetailComponent,
    IndexComponent,
    PublishComponent,
    TopicEditComponent,
    TorrentComponent,
    UserCenterComponent,
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
                redirectTo: 'topic',
                pathMatch: 'full'
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
                path: 'user/:id',
                component: UserCenterComponent
            }
        ]

    }
];
