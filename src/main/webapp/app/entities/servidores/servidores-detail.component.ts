import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Servidores } from './servidores.model';
import { ServidoresService } from './servidores.service';

@Component({
    selector: 'jhi-servidores-detail',
    templateUrl: './servidores-detail.component.html'
})
export class ServidoresDetailComponent implements OnInit, OnDestroy {

    servidores: Servidores;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private servidoresService: ServidoresService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServidores();
    }

    load(id) {
        this.servidoresService.find(id)
            .subscribe((servidoresResponse: HttpResponse<Servidores>) => {
                this.servidores = servidoresResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServidores() {
        this.eventSubscriber = this.eventManager.subscribe(
            'servidoresListModification',
            (response) => this.load(this.servidores.id)
        );
    }
}
