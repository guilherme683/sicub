import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SicubSharedModule } from '../../shared';
import {
    ServidoresService,
    ServidoresPopupService,
    ServidoresComponent,
    ServidoresDetailComponent,
    ServidoresDialogComponent,
    ServidoresPopupComponent,
    ServidoresDeletePopupComponent,
    ServidoresDeleteDialogComponent,
    servidoresRoute,
    servidoresPopupRoute,
} from './';

const ENTITY_STATES = [
    ...servidoresRoute,
    ...servidoresPopupRoute,
];

@NgModule({
    imports: [
        SicubSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        MaterialModule,
        NgxSpinnerModule,
        NgxDatatableModule
    ],
    declarations: [
        ServidoresComponent,
        ServidoresDetailComponent,
        ServidoresDialogComponent,
        ServidoresDeleteDialogComponent,
        ServidoresPopupComponent,
        ServidoresDeletePopupComponent,
    ],
    entryComponents: [
        ServidoresComponent,
        ServidoresDialogComponent,
        ServidoresPopupComponent,
        ServidoresDeleteDialogComponent,
        ServidoresDeletePopupComponent,
    ],
    providers: [
        ServidoresService,
        ServidoresPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SicubServidoresModule {}
