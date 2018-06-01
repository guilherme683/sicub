import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SicubSharedModule } from '../../shared';
import {
    ScriptsService,
    ScriptsPopupService,
    ScriptsComponent,
    ScriptsDetailComponent,
    ScriptsDialogComponent,
    ScriptsPopupComponent,
    ScriptsDeletePopupComponent,
    ScriptsDeleteDialogComponent,
    scriptsRoute,
    scriptsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scriptsRoute,
    ...scriptsPopupRoute,
];

@NgModule({
    imports: [
        SicubSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ScriptsComponent,
        ScriptsDetailComponent,
        ScriptsDialogComponent,
        ScriptsDeleteDialogComponent,
        ScriptsPopupComponent,
        ScriptsDeletePopupComponent,
    ],
    entryComponents: [
        ScriptsComponent,
        ScriptsDialogComponent,
        ScriptsPopupComponent,
        ScriptsDeleteDialogComponent,
        ScriptsDeletePopupComponent,
    ],
    providers: [
        ScriptsService,
        ScriptsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SicubScriptsModule {}
