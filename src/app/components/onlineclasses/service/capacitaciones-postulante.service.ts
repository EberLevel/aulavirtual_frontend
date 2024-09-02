import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CapacitacionesPostulanteService {
    private baseUrl = `${environment.API_BASE}`;
    private urlCapacitaciones = `${this.baseUrl}capacitaciones-postulante/`;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    getDataCreate(domain_id: number): Observable<any> {
        return this.http.get(`${this.urlCapacitaciones}data-create/${domain_id}`);
    }

    getCapacitacionesByPostulante(idPostulante: number): Observable<any> {
        return this.http.get(`${this.urlCapacitaciones}${idPostulante}`);
    }    

    guardarCapacitacion(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}capacitaciones-postulante`, data, this.httpOptions);
    }

    actualizarCapacitacion(data: any): Observable<any> {
        return this.http.put(`${this.urlCapacitaciones}${data.id}`, data, this.httpOptions);
    }

    eliminarCapacitacion(id: number): Observable<any> {
        return this.http.delete(`${this.urlCapacitaciones}${id}`, this.httpOptions);
    }
}
