
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SicubTestModule } from '../../../test.module';
import { ScriptsDialogComponent } from '../../../../../../main/webapp/app/entities/scripts/scripts-dialog.component';
import { ScriptsService } from '../../../../../../main/webapp/app/entities/scripts/scripts.service';
import { Scripts } from '../../../../../../main/webapp/app/entities/scripts/scripts.model';

describe('Component Tests', () => {

    describe('Scripts Management Dialog Component', () => {
        let comp: ScriptsDialogComponent;
        let fixture: ComponentFixture<ScriptsDialogComponent>;
        let service: ScriptsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ScriptsDialogComponent],
                providers: [
                    ScriptsService
                ]
            })
            .overrideTemplate(ScriptsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScriptsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScriptsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Scripts(123);
                        spyOn(service, 'update').and.returnValue(observableOf(new HttpResponse({body: entity})));
                        comp.scripts = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'scriptsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Scripts();
                        spyOn(service, 'create').and.returnValue(observableOf(new HttpResponse({body: entity})));
                        comp.scripts = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'scriptsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
