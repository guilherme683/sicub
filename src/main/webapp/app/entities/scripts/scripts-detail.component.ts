import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Scripts } from './scripts.model';
import { ScriptsService } from './scripts.service';

@Component({
    selector: 'jhi-scripts-detail',
    templateUrl: './scripts-detail.component.html'
})
export class ScriptsDetailComponent implements OnInit, OnDestroy {

    scripts: Scripts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scriptsService: ScriptsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScripts();
    }

    load(id) {
        this.scriptsService.find(id)
            .subscribe((scriptsResponse: HttpResponse<Scripts>) => {
                this.scripts = scriptsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScripts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scriptsListModification',
            (response) => this.load(this.scripts.id)
        );
    }
}
