import { AuthComponent } from 'app-containers';
import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: '', loadChildren: './containers/yard/yard.module#YardModule' },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path: 'auth/:key',
    component: AuthComponent
  },
];

