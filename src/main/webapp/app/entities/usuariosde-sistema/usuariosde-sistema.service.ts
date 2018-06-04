import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UsuariosdeSistema } from './usuariosde-sistema.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UsuariosdeSistema>;

@Injectable()
export class UsuariosdeSistemaService {

    private resourceUrl =  SERVER_API_URL + 'api/usuariosde-sistemas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/usuariosde-sistemas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(usuariosdeSistema: UsuariosdeSistema): Observable<EntityResponseType> {
        const copy = this.convert(usuariosdeSistema);
        return this.http.post<UsuariosdeSistema>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(usuariosdeSistema: UsuariosdeSistema): Observable<EntityResponseType> {
        const copy = this.convert(usuariosdeSistema);
        return this.http.put<UsuariosdeSistema>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UsuariosdeSistema>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UsuariosdeSistema[]>> {
        const options = createRequestOption(req);
        return this.http.get<UsuariosdeSistema[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UsuariosdeSistema[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<UsuariosdeSistema[]>> {
        const options = createRequestOption(req);
        return this.http.get<UsuariosdeSistema[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UsuariosdeSistema[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UsuariosdeSistema = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UsuariosdeSistema[]>): HttpResponse<UsuariosdeSistema[]> {
        const jsonResponse: UsuariosdeSistema[] = res.body;
        const body: UsuariosdeSistema[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UsuariosdeSistema.
     */
    private convertItemFromServer(usuariosdeSistema: UsuariosdeSistema): UsuariosdeSistema {
        const copy: UsuariosdeSistema = Object.assign({}, usuariosdeSistema);
        copy.dataCriacao = this.dateUtils
            .convertLocalDateFromServer(usuariosdeSistema.dataCriacao);
        return copy;
    }

    /**
     * Convert a UsuariosdeSistema to a JSON which can be sent to the server.
     */
    private convert(usuariosdeSistema: UsuariosdeSistema): UsuariosdeSistema {
        const copy: UsuariosdeSistema = Object.assign({}, usuariosdeSistema);
        copy.dataCriacao = this.dateUtils
            .convertLocalDateToServer(usuariosdeSistema.dataCriacao);
        return copy;
    }
}
