import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scripts } from './scripts.model';
import { ScriptsPopupService } from './scripts-popup.service';
import { ScriptsService } from './scripts.service';

@Component({
    selector: 'jhi-scripts-dialog',
    templateUrl: './scripts-dialog.component.html'
})
export class ScriptsDialogComponent implements OnInit {

    scripts: Scripts;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private scriptsService: ScriptsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scripts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scriptsService.update(this.scripts));
        } else {
            this.subscribeToSaveResponse(
                this.scriptsService.create(this.scripts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Scripts>>) {
        result.subscribe((res: HttpResponse<Scripts>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Scripts) {
        this.eventManager.broadcast({ name: 'scriptsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-scripts-popup',
    template: ''
})
export class ScriptsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scriptsPopupService: ScriptsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scriptsPopupService
                    .open(ScriptsDialogComponent as Component, params['id']);
            } else {
                this.scriptsPopupService
                    .open(ScriptsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
