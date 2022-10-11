import {StartLayoutComponent, AdminLayoutComponent, AuthLayoutComponent } from '../barrel/layouts';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/route.guard';
import { NotFoundComponent } from '../layouts/not-found-layout/not-found.component';
import { authorizationRoute } from './authorization-route';
import {pageRoute} from './page-route';

export const layoutRoute = [

    {
        path: '',
        canActivate:[LoginGuard],
        component: StartLayoutComponent
    },
    {   
        path: 'admin',
        canActivate:[AuthGuard],
        canDeactivate:[AuthGuard],
        component: AdminLayoutComponent,
        children: pageRoute
    },
    {
        path: 'authorization',
        canActivate:[LoginGuard],
        component: AuthLayoutComponent,
        children: authorizationRoute
     },
    {
        path: '**',
        component: NotFoundComponent
    }
];