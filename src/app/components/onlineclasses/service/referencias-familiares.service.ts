import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReferenciasFamiliaresService {
    private baseUrl = `${environment.API_BASE}`;
    private urlReferencias = `${this.baseUrl}referencias-familiares/`;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    getReferenciasByPostulante(idPostulante: number): Observable<any> {
        return this.http.get(`${this.urlReferencias}${idPostulante}`);
    }

    guardarReferencia(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}referencias-familiares`, data, this.httpOptions);
    }

    actualizarReferencia(data: any): Observable<any> {
        return this.http.put(`${this.urlReferencias}${data.id}`, data, this.httpOptions);
    }

    eliminarReferencia(id: number): Observable<any> {
        return this.http.delete(`${this.urlReferencias}${id}`, this.httpOptions);
    }
}
