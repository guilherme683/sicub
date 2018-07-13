import { Component, OnInit } from '@angular/core';

import { Log } from './log.model';
import { LogsService } from './logs.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'jhi-logs',
    templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {

    loggers: Log[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(
        private logsService: LogsService,
        private spinner: NgxSpinnerService
    ) {
        this.filter = '';
        this.orderProp = 'name';
        this.reverse = false;
    }

    ngOnInit() {
        this.spinner.show();
        this.logsService.findAll().subscribe((response) => this.loggers = response.body);
        setTimeout(() => {
                this.spinner.hide();
                }, 3000);
    }

    changeLevel(name: string, level: string) {
        const log = new Log(name, level);
        this.logsService.changeLevel(log).subscribe(() => {
            this.logsService.findAll().subscribe((response) => this.loggers = response.body);
        });

    }
}
