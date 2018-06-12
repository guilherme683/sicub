
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SicubTestModule } from '../../../test.module';
import { ServidoresDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/servidores/servidores-delete-dialog.component';
import { ServidoresService } from '../../../../../../main/webapp/app/entities/servidores/servidores.service';

describe('Component Tests', () => {

    describe('Servidores Management Delete Component', () => {
        let comp: ServidoresDeleteDialogComponent;
        let fixture: ComponentFixture<ServidoresDeleteDialogComponent>;
        let service: ServidoresService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ServidoresDeleteDialogComponent],
                providers: [
                    ServidoresService
                ]
            })
            .overrideTemplate(ServidoresDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServidoresDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServidoresService);
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
