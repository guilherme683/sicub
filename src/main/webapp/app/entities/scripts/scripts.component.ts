import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

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
    exampleDatabase: ExampleHttpDao | null;
    data: GithubIssue[] = [];
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
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
        private http: HttpClient
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
        (res: HttpResponse<Scripts[]>) => this.dataSource.data =  res.body,
        (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.page = 0;
        this.scripts = [];
        this.loadAll();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    search(query) {
        if (!query) {
            this.scripts = this.dataSource.data;
        } else {
            this.query2 = query;
            this.query2 = this.query2.trim().toLowerCase();
            this.currentSearch = query;
            this.dataSource.data = this.dataSource.data.filter((scripts: Scripts) => scripts.acao.startsWith(this.currentSearch));
        }
    }

    clear() {
        this.scripts = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.dataSource.filter = '';
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        startWith({}),
        switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getRepoIssues(
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
      }),
        catchError(() => {
            this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
      })
        ).subscribe((data) => this.data = data);

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

export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
}

export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
}

export class ExampleHttpDao {
    constructor(private http: HttpClient) {}

    getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
        const href = 'https://api.github.com/search/issues';
        const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

        return this.http.get<GithubApi>(requestUrl);
    }
}
