
import {of as observableOf,  Observable } from 'rxjs';
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SicubTestModule } from '../../../test.module';
import { UsuariosdeSistemaComponent } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.component';
import { UsuariosdeSistemaService } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.service';
import { UsuariosdeSistema } from '../../../../../../main/webapp/app/entities/usuariosde-sistema/usuariosde-sistema.model';

describe('Component Tests', () => {

    describe('UsuariosdeSistema Management Component', () => {
        let comp: UsuariosdeSistemaComponent;
        let fixture: ComponentFixture<UsuariosdeSistemaComponent>;
        let service: UsuariosdeSistemaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SicubTestModule],
                declarations: [UsuariosdeSistemaComponent],
                providers: [
                    UsuariosdeSistemaService
                ]
            })
            .overrideTemplate(UsuariosdeSistemaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuariosdeSistemaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuariosdeSistemaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(observableOf(new HttpResponse({
                    body: [new UsuariosdeSistema(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.usuariosdeSistemas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
