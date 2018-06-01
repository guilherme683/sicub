/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SicubTestModule } from '../../../test.module';
import { UsuariosdeSistemaDetailComponent } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema-detail.component';
import { UsuariosdeSistemaService } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.service';
import { UsuariosdeSistema } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.model';

describe('Component Tests', () => {

    describe('UsuariosdeSistema Management Detail Component', () => {
        let comp: UsuariosdeSistemaDetailComponent;
        let fixture: ComponentFixture<UsuariosdeSistemaDetailComponent>;
        let service: UsuariosdeSistemaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [UsuariosdeSistemaDetailComponent],
                providers: [
                    UsuariosdeSistemaService
                ]
            })
            .overrideTemplate(UsuariosdeSistemaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuariosdeSistemaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuariosdeSistemaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UsuariosdeSistema(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.usuariosdeSistema).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
