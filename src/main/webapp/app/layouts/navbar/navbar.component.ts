import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, JhiEventManager } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService, JhiLoginModalComponent } from '../../shared';
import { ToastrService } from 'ngx-toastr';

import { VERSION } from '../../app.constants';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    account: Account;
    modalRef: MatDialogRef<JhiLoginModalComponent>;
    version: string;

    constructor(
        private toastr: ToastrService,
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
         this.principal.identity().then((account) => {
            this.account = account;
        });
        /* this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        }); */

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
         this.registerAuthenticationSuccess();
    }

     registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

   /* changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    } */

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
         this.modalRef = this.loginModalService.openModalMaterial();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
        this.toastr.info('Usuário deslogado!', 'Logout!');
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
