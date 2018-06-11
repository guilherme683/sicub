import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuariosdeSistema } from './usuariosde-sistema.model';
import { UsuariosdeSistemaPopupService } from './usuariosde-sistema-popup.service';
import { UsuariosdeSistemaService } from './usuariosde-sistema.service';
import { Servidores, ServidoresService } from '../servidores';

@Component({
    selector: 'jhi-usuariosde-sistema-dialog',
    templateUrl: './usuariosde-sistema-dialog.component.html'
})
export class UsuariosdeSistemaDialogComponent implements OnInit {

    usuariosdeSistema: UsuariosdeSistema;
    isSaving: boolean;

    servidores: Servidores[];
    dataCriacaoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuariosdeSistemaService: UsuariosdeSistemaService,
        private servidoresService: ServidoresService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.servidoresService.query()
            .subscribe((res: HttpResponse<Servidores[]>) => { this.servidores = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuariosdeSistema.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuariosdeSistemaService.update(this.usuariosdeSistema));
        } else {
            this.subscribeToSaveResponse(
                this.usuariosdeSistemaService.create(this.usuariosdeSistema));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UsuariosdeSistema>>) {
        result.subscribe((res: HttpResponse<UsuariosdeSistema>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuariosdeSistema) {
        this.eventManager.broadcast({ name: 'usuariosdeSistemaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServidoresById(index: number, item: Servidores) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-usuariosde-sistema-popup',
    template: ''
})
export class UsuariosdeSistemaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuariosdeSistemaPopupService: UsuariosdeSistemaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuariosdeSistemaPopupService
                    .open(UsuariosdeSistemaDialogComponent as Component, params['id']);
            } else {
                this.usuariosdeSistemaPopupService
                    .open(UsuariosdeSistemaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
