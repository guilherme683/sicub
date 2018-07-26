/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SicubTestModule } from '../../../test.module';
import { ScriptsDetailComponent } from '../../../../../../main/webapp/app/entities/scripts/scripts-detail.component';
import { ScriptsService } from '../../../../../../main/webapp/app/entities/scripts/scripts.service';
import { Scripts } from '../../../../../../main/webapp/app/entities/scripts/scripts.model';

describe('Component Tests', () => {

    describe('Scripts Management Detail Component', () => {
        let comp: ScriptsDetailComponent;
        let fixture: ComponentFixture<ScriptsDetailComponent>;
        let service: ScriptsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ScriptsDetailComponent],
                providers: [
                    ScriptsService
                ]
            })
            .overrideTemplate(ScriptsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScriptsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScriptsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Scripts(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.scripts).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
