import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { SicubSharedModule, UserRouteAccessService } from './shared';
import { SicubAppRoutingModule} from './app-routing.module';
import { SicubHomeModule } from './home/home.module';
import { SicubAdminModule } from './admin/admin.module';
import { SicubAccountModule } from './account/account.module';
import { SicubEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import {
    JhiMainComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        SicubAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        SicubSharedModule,
        SicubHomeModule,
        SicubAdminModule,
        SicubAccountModule,
        SicubEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        MatToolbarModule,
        MatCheckboxModule,
        MatButtonModule,
        MatMenuModule,
        BrowserAnimationsModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        MatExpansionModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
        timeOut: 6000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        closeButton: true,
        }),
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        SidebarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class SicubAppModule {}
