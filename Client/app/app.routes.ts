import { Route } from '@angular/router';
import { AuthComponent } from 'app-containers';

export const ROUTES: Route[] = [
  { path: '', loadChildren: 'app/yard/yard.module#YardModule' },
  { path: 'auth', component: AuthComponent }
];
