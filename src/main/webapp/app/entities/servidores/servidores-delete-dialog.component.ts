import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Servidores } from './servidores.model';
import { ServidoresPopupService } from './servidores-popup.service';
import { ServidoresService } from './servidores.service';

@Component({
    selector: 'jhi-servidores-delete-dialog',
    templateUrl: './servidores-delete-dialog.component.html'
})
export class ServidoresDeleteDialogComponent {

    servidores: Servidores;

    constructor(
        private servidoresService: ServidoresService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.servidoresService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'servidoresListModification',
                content: 'Deleted an servidores'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-servidores-delete-popup',
    template: ''
})
export class ServidoresDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servidoresPopupService: ServidoresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.servidoresPopupService
                .open(ServidoresDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
