
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';

import { SicubTestModule } from '../../../test.module';
import { ServidoresDetailComponent } from '../../../../../../main/webapp/app/entities/servidores/servidores-detail.component';
import { ServidoresService } from '../../../../../../main/webapp/app/entities/servidores/servidores.service';
import { Servidores } from '../../../../../../main/webapp/app/entities/servidores/servidores.model';

describe('Component Tests', () => {

    describe('Servidores Management Detail Component', () => {
        let comp: ServidoresDetailComponent;
        let fixture: ComponentFixture<ServidoresDetailComponent>;
        let service: ServidoresService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ServidoresDetailComponent],
                providers: [
                    ServidoresService
                ]
            })
            .overrideTemplate(ServidoresDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServidoresDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServidoresService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(observableOf(new HttpResponse({
                    body: new Servidores(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.servidores).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
