import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse, Base } from '../interface/general';
@Injectable({
    providedIn: 'root',
})
export class DocenteService {
    private baseUrl = `${environment.API_BASE}`;    
    private urlparametro = `${environment.API_BASE}`;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    constructor(
        private http: HttpClient,
        private httpClientFormData: HttpClient,
        public handler: HttpBackend,
    ) {
        this.httpClientFormData = new HttpClient(this.handler);
    }

    listarDocentes(domain_id:any):Observable<any>{
        return this.http.get(`${this.baseUrl}docentes/listar/${domain_id}`);
    }

    getLoggedDocente(docenteId: number, domainId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}docentes/logged/${docenteId}/${domainId}`);
    }

    buscarDocentes(id:number):Observable<any>{
        return this.http.get(`${this.baseUrl}docentes/listar/${id}`);
    }

    registrarDocentes(data:any):Observable<any>{
        return this.http.post<any>(`${this.baseUrl}docentes/registrar`,data);
    }

    actualizarDocentes(data:any):Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}docentes/actualizar/${data.id}`,data, {headers: headers});
    }

    eliminarDocentes(id:number):Observable<any>{
        // let response = JSON.stringify(data);
        return this.http.get<any>(`${this.baseUrl}docentes/eliminar/${id}`);
    }
}