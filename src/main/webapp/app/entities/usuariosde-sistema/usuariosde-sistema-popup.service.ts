import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UsuariosdeSistema } from './usuariosde-sistema.model';
import { UsuariosdeSistemaService } from './usuariosde-sistema.service';

@Injectable()
export class UsuariosdeSistemaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private usuariosdeSistemaService: UsuariosdeSistemaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.usuariosdeSistemaService.find(id)
                    .subscribe((usuariosdeSistemaResponse: HttpResponse<UsuariosdeSistema>) => {
                        const usuariosdeSistema: UsuariosdeSistema = usuariosdeSistemaResponse.body;
                        if (usuariosdeSistema.dataCriacao) {
                            usuariosdeSistema.dataCriacao = {
                                year: usuariosdeSistema.dataCriacao.getFullYear(),
                                month: usuariosdeSistema.dataCriacao.getMonth() + 1,
                                day: usuariosdeSistema.dataCriacao.getDate()
                            };
                        }
                        this.ngbModalRef = this.usuariosdeSistemaModalRef(component, usuariosdeSistema);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.usuariosdeSistemaModalRef(component, new UsuariosdeSistema());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usuariosdeSistemaModalRef(component: Component, usuariosdeSistema: UsuariosdeSistema): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usuariosdeSistema = usuariosdeSistema;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
