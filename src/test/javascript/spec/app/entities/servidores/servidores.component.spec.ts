/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SicubTestModule } from '../../../test.module';
import { ServidoresComponent } from '../../../../../../main/webapp/app/entities/servidores/servidores.component';
import { ServidoresService } from '../../../../../../main/webapp/app/entities/servidores/servidores.service';
import { Servidores } from '../../../../../../main/webapp/app/entities/servidores/servidores.model';

describe('Component Tests', () => {

    describe('Servidores Management Component', () => {
        let comp: ServidoresComponent;
        let fixture: ComponentFixture<ServidoresComponent>;
        let service: ServidoresService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [ServidoresComponent],
                providers: [
                    ServidoresService
                ]
            })
            .overrideTemplate(ServidoresComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServidoresComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServidoresService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Servidores(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.servidores[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
