import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ExperienciaLaboralService {
    private baseUrl = `${environment.API_BASE}`;
    private urlExperiencias = `${this.baseUrl}experiencia-laboral/`;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}
    
    getDataCreate(domain_id: number): Observable<any> {
        return this.http.get(`${this.urlExperiencias}data-create/${domain_id}`);
    }

    getExperienciasByPostulante(idPostulante: number): Observable<any> {
        return this.http.get(`${this.urlExperiencias}${idPostulante}`);
    }    

    guardarExperiencia(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}experiencia-laboral`, data, this.httpOptions);
    }

    actualizarExperiencia(data: any): Observable<any> {
        return this.http.put(`${this.urlExperiencias}${data.id}`, data, this.httpOptions);
    }

    eliminarExperiencia(id: number): Observable<any> {
        return this.http.delete(`${this.urlExperiencias}${id}`, this.httpOptions);
    }
}
