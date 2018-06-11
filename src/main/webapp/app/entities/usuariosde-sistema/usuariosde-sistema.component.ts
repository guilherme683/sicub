import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuariosdeSistema } from './usuariosde-sistema.model';
import { UsuariosdeSistemaService } from './usuariosde-sistema.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-usuariosde-sistema',
    templateUrl: './usuariosde-sistema.component.html'
})
export class UsuariosdeSistemaComponent implements OnInit, OnDestroy {
usuariosdeSistemas: UsuariosdeSistema[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private usuariosdeSistemaService: UsuariosdeSistemaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.usuariosdeSistemaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<UsuariosdeSistema[]>) => this.usuariosdeSistemas = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.usuariosdeSistemaService.query().subscribe(
            (res: HttpResponse<UsuariosdeSistema[]>) => {
                this.usuariosdeSistemas = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUsuariosdeSistemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UsuariosdeSistema) {
        return item.id;
    }
    registerChangeInUsuariosdeSistemas() {
        this.eventSubscriber = this.eventManager.subscribe('usuariosdeSistemaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
