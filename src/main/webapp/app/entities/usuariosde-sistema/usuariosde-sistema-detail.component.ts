import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UsuariosdeSistema } from './usuariosde-sistema.model';
import { UsuariosdeSistemaService } from './usuariosde-sistema.service';

@Component({
    selector: 'jhi-usuariosde-sistema-detail',
    templateUrl: './usuariosde-sistema-detail.component.html'
})
export class UsuariosdeSistemaDetailComponent implements OnInit, OnDestroy {

    usuariosdeSistema: UsuariosdeSistema;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuariosdeSistemaService: UsuariosdeSistemaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuariosdeSistemas();
    }

    load(id) {
        this.usuariosdeSistemaService.find(id)
            .subscribe((usuariosdeSistemaResponse: HttpResponse<UsuariosdeSistema>) => {
                this.usuariosdeSistema = usuariosdeSistemaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuariosdeSistemas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuariosdeSistemaListModification',
            (response) => this.load(this.usuariosdeSistema.id)
        );
    }
}
