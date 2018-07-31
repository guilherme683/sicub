import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
        RouterModule.forChild(ENTITY_STATES),
        MaterialModule,
        NgxSpinnerModule,
        NgxDatatableModule,
        MatDatepickerModule
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
