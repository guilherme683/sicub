import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Servidores } from './servidores.model';
import { ServidoresService } from './servidores.service';

@Injectable()
export class ServidoresPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private servidoresService: ServidoresService

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
                this.servidoresService.find(id)
                    .subscribe((servidoresResponse: HttpResponse<Servidores>) => {
                        const servidores: Servidores = servidoresResponse.body;
                        this.ngbModalRef = this.servidoresModalRef(component, servidores);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.servidoresModalRef(component, new Servidores());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    servidoresModalRef(component: Component, servidores: Servidores): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', windowClass: 'animated fadeInDown'});
        modalRef.componentInstance.servidores = servidores;
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
