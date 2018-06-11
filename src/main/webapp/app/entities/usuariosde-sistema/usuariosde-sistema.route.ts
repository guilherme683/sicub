import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UsuariosdeSistemaComponent } from './usuariosde-sistema.component';
import { UsuariosdeSistemaDetailComponent } from './usuariosde-sistema-detail.component';
import { UsuariosdeSistemaPopupComponent } from './usuariosde-sistema-dialog.component';
import { UsuariosdeSistemaDeletePopupComponent } from './usuariosde-sistema-delete-dialog.component';

export const usuariosdeSistemaRoute: Routes = [
    {
        path: 'usuariosde-sistema',
        component: UsuariosdeSistemaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.usuariosdeSistema.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuariosde-sistema/:id',
        component: UsuariosdeSistemaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.usuariosdeSistema.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuariosdeSistemaPopupRoute: Routes = [
    {
        path: 'usuariosde-sistema-new',
        component: UsuariosdeSistemaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.usuariosdeSistema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuariosde-sistema/:id/edit',
        component: UsuariosdeSistemaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.usuariosdeSistema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuariosde-sistema/:id/delete',
        component: UsuariosdeSistemaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sicubApp.usuariosdeSistema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
