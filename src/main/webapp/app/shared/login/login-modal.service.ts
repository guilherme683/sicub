import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material';
import { JhiLoginModalComponent } from './login.component';
import { error } from 'selenium-webdriver';

@Injectable()
export class LoginModalService {
private isOpen = false;
constructor(
        private modalService: NgbModal,
        private modelServiceMat: MatDialog
    ) {}

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(JhiLoginModalComponent);
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

    openModalMaterial(): MatDialogRef<JhiLoginModalComponent> {
        if (this.isOpen) {

            return;
        }
        this.isOpen = true;
        const modalRef = this.modelServiceMat.open(JhiLoginModalComponent, { width: '500px', height: 'auto' });
        modalRef.afterClosed().subscribe((result) => {
            this.isOpen = false;
        // tslint:disable-next-line:no-shadowed-variable
        }, (error) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
