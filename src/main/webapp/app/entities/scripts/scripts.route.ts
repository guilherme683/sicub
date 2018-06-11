import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ScriptsComponent } from './scripts.component';
import { ScriptsDetailComponent } from './scripts-detail.component';
import { ScriptsPopupComponent } from './scripts-dialog.component';
import { ScriptsDeletePopupComponent } from './scripts-delete-dialog.component';

export const scriptsRoute: Routes = [
    {
        path: 'scripts',
        component: ScriptsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scripts/:id',
        component: ScriptsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scriptsPopupRoute: Routes = [
    {
        path: 'scripts-new',
        component: ScriptsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scripts/:id/edit',
        component: ScriptsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scripts/:id/delete',
        component: ScriptsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
