import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Servidores } from './servidores.model';
import { ServidoresPopupService } from './servidores-popup.service';
import { ServidoresService } from './servidores.service';
import { UsuariosdeSistema, UsuariosdeSistemaService } from '../usuariosde-sistema';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-servidores-dialog',
    templateUrl: './servidores-dialog.component.html'
})
export class ServidoresDialogComponent implements OnInit {

    servidores: Servidores;
    isSaving: boolean;

    usuariosdesistemas: UsuariosdeSistema[];

    constructor(
        private toastr: ToastrService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private servidoresService: ServidoresService,
        private usuariosdeSistemaService: UsuariosdeSistemaService,
        private spinner: NgxSpinnerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuariosdeSistemaService.query()
            .subscribe((res: HttpResponse<UsuariosdeSistema[]>) => { this.usuariosdesistemas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.servidores.id !== undefined) {
            this.subscribeToSaveResponse(
                this.servidoresService.update(this.servidores));
            setTimeout(() => {
                this.spinner.hide();
                }, 3000);
            this.toastr.success('Servidor alterado com sucesso!', '');
        } else {
            this.subscribeToSaveResponse(
                this.servidoresService.create(this.servidores));
             setTimeout(() => {
                this.spinner.hide();
                }, 3000);
             this.toastr.success('Servidor criado com sucesso!', '');
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Servidores>>) {
        result.subscribe((res: HttpResponse<Servidores>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Servidores) {
        this.eventManager.broadcast({ name: 'servidoresListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuariosdeSistemaById(index: number, item: UsuariosdeSistema) {
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
    selector: 'jhi-servidores-popup',
    template: ''
})
export class ServidoresPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servidoresPopupService: ServidoresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servidoresPopupService
                    .open(ServidoresDialogComponent as Component, params['id']);
            } else {
                this.servidoresPopupService
                    .open(ServidoresDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
