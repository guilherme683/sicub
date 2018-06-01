import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SicubScriptsModule } from './scripts/scripts.module';
import { SicubUsuariosdeSistemaModule } from './usuariosde-sistema/usuariosde-sistema.module';
import { SicubServidoresModule } from './servidores/servidores.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SicubScriptsModule,
        SicubUsuariosdeSistemaModule,
        SicubServidoresModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SicubEntityModule {}
