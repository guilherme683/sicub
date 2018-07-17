import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

import { Scripts } from './scripts.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Scripts>;

@Injectable()
export class ScriptsService {

    private resourceUrl =  SERVER_API_URL + 'api/scripts';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/scripts';

    constructor(private http: HttpClient) { }

    create(scripts: Scripts): Observable<EntityResponseType> {
        const copy = this.convert(scripts);
        return this.http.post<Scripts>(this.resourceUrl, copy, { observe: 'response' }).pipe(
            map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(scripts: Scripts): Observable<EntityResponseType> {
        const copy = this.convert(scripts);
        return this.http.put<Scripts>(this.resourceUrl, copy, { observe: 'response' }).pipe(
            map((res: EntityResponseType) => this.convertResponse(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Scripts>(`${this.resourceUrl}/${id}`, { observe: 'response'}).pipe(
            map((res: EntityResponseType) => this.convertResponse(res)));
    }

    query(req?: any): Observable<HttpResponse<Scripts[]>> {
        const options = createRequestOption(req);
        return this.http.get<Scripts[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
            map((res: HttpResponse<Scripts[]>) => this.convertArrayResponse(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Scripts[]>> {
        const options = createRequestOption(req);
        return this.http.get<Scripts[]>(this.resourceSearchUrl, { params: options, observe: 'response' }).pipe(
            map((res: HttpResponse<Scripts[]>) => this.convertArrayResponse(res)));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Scripts = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Scripts[]>): HttpResponse<Scripts[]> {
        const jsonResponse: Scripts[] = res.body;
        const body: Scripts[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Scripts.
     */
    private convertItemFromServer(scripts: Scripts): Scripts {
        const copy: Scripts = Object.assign({}, scripts);
        return copy;
    }

    /**
     * Convert a Scripts to a JSON which can be sent to the server.
     */
    private convert(scripts: Scripts): Scripts {
        const copy: Scripts = Object.assign({}, scripts);
        return copy;
    }
}
