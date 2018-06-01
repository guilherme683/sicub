import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServidoresComponent } from './servidores.component';
import { ServidoresDetailComponent } from './servidores-detail.component';
import { ServidoresPopupComponent } from './servidores-dialog.component';
import { ServidoresDeletePopupComponent } from './servidores-delete-dialog.component';

export const servidoresRoute: Routes = [
    {
        path: 'servidores',
        component: ServidoresComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.servidores.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'servidores/:id',
        component: ServidoresDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.servidores.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servidoresPopupRoute: Routes = [
    {
        path: 'servidores-new',
        component: ServidoresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.servidores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servidores/:id/edit',
        component: ServidoresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.servidores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servidores/:id/delete',
        component: ServidoresDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.servidores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
