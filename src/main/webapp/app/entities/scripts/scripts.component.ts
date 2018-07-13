import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { Scripts } from './scripts.model';
import { ScriptsService } from './scripts.service';
import { Principal, ITEMS_PER_PAGE } from '../../shared';

@Component({
    selector: 'jhi-scripts',
    templateUrl: './scripts.component.html'
})
export class ScriptsComponent implements OnInit, OnDestroy {
    scripts: Scripts[];
    displayedColumns: string[] = ['id', 'acao', 'comando', 'sgdb', 'acoes'];
    dataSource = new MatTableDataSource();
    currentAccount: any;
    query2: string;
    eventSubscriber: Subscription;
    currentSearch: string;
    totalItems: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    itemsPerPage: number;
    reverse: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private scriptsService: ScriptsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.scriptsService.search({
                page: this.page,
                size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<Scripts[]>) => this.scripts =  res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.scriptsService.query({
            page: this.page
            }).subscribe(
                (res: HttpResponse<Scripts[]>) => this.scripts =  res.body,
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

        reset() {
        this.page = 0;
        this.scripts = [];
        this.loadAll();
    }

    search(query) {
        if (!query) {
            this.dataSource.data = this.scripts;
        } else {
            this.query2 = query;
            this.query2 = this.query2.trim().toLowerCase();
            this.currentSearch = query;
            this.dataSource.data = this.scripts.filter((scripts: Scripts) => scripts.acao.startsWith(this.currentSearch));
         }
    }

    clear() {
        this.scripts = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInScripts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Scripts) {
        return item.id;
    }
    registerChangeInScripts() {
        this.eventSubscriber = this.eventManager.subscribe('scriptsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
