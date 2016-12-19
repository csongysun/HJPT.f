import { Route } from '@angular/router';
import { AdminGuard } from 'app-services';
import { AdminComponent, AdminIndexComponent } from 'app-containers';

export const ROUTES: Route[] = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                redirectTo: 'index',
                pathMatch: 'full'
            },
            {
                path: 'index',
                component: AdminIndexComponent
            },
        ]

    }
];
