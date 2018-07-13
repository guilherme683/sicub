import { Component, OnInit } from '@angular/core';

import { JhiConfigurationService } from './configuration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'jhi-configuration',
    templateUrl: './configuration.component.html'
})
export class JhiConfigurationComponent implements OnInit {
    allConfiguration: any = null;
    configuration: any = null;
    configKeys: any[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(
        private configurationService: JhiConfigurationService,
        private spinner: NgxSpinnerService
    ) {
        this.configKeys = [];
        this.filter = '';
        this.orderProp = 'prefix';
        this.reverse = false;
    }

    keys(dict): Array<string> {
        return (dict === undefined) ? [] : Object.keys(dict);
    }

    ngOnInit() {
        this.spinner.show();
        this.configurationService.get().subscribe((configuration) => {
            this.configuration = configuration;

            for (const config of configuration) {
                if (config.properties !== undefined) {
                    this.configKeys.push(Object.keys(config.properties));
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 3000);
                }
            }
        });

        this.configurationService.getEnv().subscribe((configuration) => {
            this.allConfiguration = configuration;
        });
    }
}
