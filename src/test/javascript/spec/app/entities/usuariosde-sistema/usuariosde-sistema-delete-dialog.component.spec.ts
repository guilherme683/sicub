
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SicubTestModule } from '../../../test.module';
import { UsuariosdeSistemaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema-delete-dialog.component';
import { UsuariosdeSistemaService } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.service';

describe('Component Tests', () => {

    describe('UsuariosdeSistema Management Delete Component', () => {
        let comp: UsuariosdeSistemaDeleteDialogComponent;
        let fixture: ComponentFixture<UsuariosdeSistemaDeleteDialogComponent>;
        let service: UsuariosdeSistemaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [UsuariosdeSistemaDeleteDialogComponent],
                providers: [
                    UsuariosdeSistemaService
                ]
            })
            .overrideTemplate(UsuariosdeSistemaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuariosdeSistemaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuariosdeSistemaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(observableOf({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
