import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scripts } from './scripts.model';
import { ScriptsPopupService } from './scripts-popup.service';
import { ScriptsService } from './scripts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-scripts-delete-dialog',
    templateUrl: './scripts-delete-dialog.component.html'
})
export class ScriptsDeleteDialogComponent {

    scripts: Scripts;

    constructor(
        private toastr: ToastrService,
        private scriptsService: ScriptsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scriptsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scriptsListModification',
                content: 'Deleted an scripts'
            });
            this.activeModal.dismiss(true);
            this.toastr.success('Script excluído com sucesso!', '');

        });
    }
}

@Component({
    selector: 'jhi-scripts-delete-popup',
    template: ''
})
export class ScriptsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scriptsPopupService: ScriptsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scriptsPopupService
                .open(ScriptsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
