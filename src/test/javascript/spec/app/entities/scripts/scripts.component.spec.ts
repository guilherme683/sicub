
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SicubTestModule } from '../../../test.module';
import { ScriptsComponent } from '../../../../../../main/webapp/app/entities/scripts/scripts.component';
import { ScriptsService } from '../../../../../../main/webapp/app/entities/scripts/scripts.service';
import { Scripts } from '../../../../../../main/webapp/app/entities/scripts/scripts.model';

describe('Component Tests', () => {

    describe('Scripts Management Component', () => {
        let comp: ScriptsComponent;
        let fixture: ComponentFixture<ScriptsComponent>;
        let service: ScriptsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ScriptsComponent],
                providers: [
                    ScriptsService
                ]
            })
            .overrideTemplate(ScriptsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScriptsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScriptsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(observableOf(new HttpResponse({
                    body: [new Scripts(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.scripts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
