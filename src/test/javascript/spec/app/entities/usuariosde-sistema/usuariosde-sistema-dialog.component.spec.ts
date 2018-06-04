/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SicubTestModule } from '../../../test.module';
import { UsuariosdeSistemaDialogComponent } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema-dialog.component';
import { UsuariosdeSistemaService } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.service';
import { UsuariosdeSistema } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.model';
import { ServidoresService } from '../../../../../../main/webapp/app/entities/servidores';

describe('Component Tests', () => {

    describe('UsuariosdeSistema Management Dialog Component', () => {
        let comp: UsuariosdeSistemaDialogComponent;
        let fixture: ComponentFixture<UsuariosdeSistemaDialogComponent>;
        let service: UsuariosdeSistemaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [UsuariosdeSistemaDialogComponent],
                providers: [
                    ServidoresService,
                    UsuariosdeSistemaService
                ]
            })
            .overrideTemplate(UsuariosdeSistemaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuariosdeSistemaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuariosdeSistemaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UsuariosdeSistema(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.usuariosdeSistema = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'usuariosdeSistemaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UsuariosdeSistema();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.usuariosdeSistema = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'usuariosdeSistemaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
