import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SicubSharedModule } from '../../shared';
import {
    UsuariosdeSistemaService,
    UsuariosdeSistemaPopupService,
    UsuariosdeSistemaComponent,
    UsuariosdeSistemaDetailComponent,
    UsuariosdeSistemaDialogComponent,
    UsuariosdeSistemaPopupComponent,
    UsuariosdeSistemaDeletePopupComponent,
    UsuariosdeSistemaDeleteDialogComponent,
    usuariosdeSistemaRoute,
    usuariosdeSistemaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...usuariosdeSistemaRoute,
    ...usuariosdeSistemaPopupRoute,
];

@NgModule({
    imports: [
        SicubSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuariosdeSistemaComponent,
        UsuariosdeSistemaDetailComponent,
        UsuariosdeSistemaDialogComponent,
        UsuariosdeSistemaDeleteDialogComponent,
        UsuariosdeSistemaPopupComponent,
        UsuariosdeSistemaDeletePopupComponent,
    ],
    entryComponents: [
        UsuariosdeSistemaComponent,
        UsuariosdeSistemaDialogComponent,
        UsuariosdeSistemaPopupComponent,
        UsuariosdeSistemaDeleteDialogComponent,
        UsuariosdeSistemaDeletePopupComponent,
    ],
    providers: [
        UsuariosdeSistemaService,
        UsuariosdeSistemaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SicubUsuariosdeSistemaModule {}
