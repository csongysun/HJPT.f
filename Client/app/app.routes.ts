import { LoginFormComponent, RegFormComponent } from 'app-components';

import { AuthComponent } from 'app-containers';
import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: '', loadChildren: './containers/yard/yard.module#YardModule' },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginFormComponent
      }, {
        path: 'register',
        component: RegFormComponent
      }
    ]
  },
];

