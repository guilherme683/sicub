
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SicubTestModule } from '../../../test.module';
import { ServidoresDialogComponent } from '../../../../../../main/webapp/app/entities/servidores/servidores-dialog.component';
import { ServidoresService } from '../../../../../../main/webapp/app/entities/servidores/servidores.service';
import { Servidores } from '../../../../../../main/webapp/app/entities/servidores/servidores.model';
import { UsuariosdeSistemaService } from '../../../../../../main/webapp/app/entities/usuariosde-sistema';

describe('Component Tests', () => {

    describe('Servidores Management Dialog Component', () => {
        let comp: ServidoresDialogComponent;
        let fixture: ComponentFixture<ServidoresDialogComponent>;
        let service: ServidoresService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ServidoresDialogComponent],
                providers: [
                    UsuariosdeSistemaService,
                    ServidoresService
                ]
            })
            .overrideTemplate(ServidoresDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServidoresDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServidoresService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Servidores(123);
                        spyOn(service, 'update').and.returnValue(observableOf(new HttpResponse({body: entity})));
                        comp.servidores = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'servidoresListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Servidores();
                        spyOn(service, 'create').and.returnValue(observableOf(new HttpResponse({body: entity})));
                        comp.servidores = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'servidoresListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
