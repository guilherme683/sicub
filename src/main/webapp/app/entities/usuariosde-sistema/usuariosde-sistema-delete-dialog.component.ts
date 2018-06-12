import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuariosdeSistema } from './usuariosde-sistema.model';
import { UsuariosdeSistemaPopupService } from './usuariosde-sistema-popup.service';
import { UsuariosdeSistemaService } from './usuariosde-sistema.service';

@Component({
    selector: 'jhi-usuariosde-sistema-delete-dialog',
    templateUrl: './usuariosde-sistema-delete-dialog.component.html'
})
export class UsuariosdeSistemaDeleteDialogComponent {

    usuariosdeSistema: UsuariosdeSistema;

    constructor(
        private usuariosdeSistemaService: UsuariosdeSistemaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuariosdeSistemaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuariosdeSistemaListModification',
                content: 'Deleted an usuariosdeSistema'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuariosde-sistema-delete-popup',
    template: ''
})
export class UsuariosdeSistemaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuariosdeSistemaPopupService: UsuariosdeSistemaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuariosdeSistemaPopupService
                .open(UsuariosdeSistemaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
