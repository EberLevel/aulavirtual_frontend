import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})

export class AlumnoService{
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
     saveAlumno(data:any):Observable<any>{
        return this.http.post(`${this.baseUrl}alumnos`,data);
    }

    getAlumnos(domain_id:number):Observable<any>{
        return this.http.get(`${this.baseUrl}alumnos/${domain_id}`);
    }
    getLoggedAlumno(alumnoId: number, domainId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}alumnos/logged/${alumnoId}/${domainId}`);
    }

    deleteAlumno(data:any):Observable<any>{
        return this.http.delete(`${this.baseUrl}alumnos/${data.id}/${data.domain_id}`);
    }
    editAlumno(alumnoData: any, id: number, domain_id: number): Observable<any> {
        return this.http.put(`${this.baseUrl}alumnos/${id}/${domain_id}`, alumnoData);
      }
      
    showAlumno(data:any):Observable<any>{
        return this.http.get(`${this.baseUrl}alumnos/logged/${data.id}/${data.domain_id}`);
    }

    listarPagoDeAlumno(alumno_id: number, domain_id: number,available: boolean = false):Observable<any>{
        return this.http
            .post(`${this.baseUrl}alumnos/${alumno_id}/${domain_id}`, available);
    }

    subirComprobante(data: any) {
        return this.http.post(`${this.baseUrl}alumnos/subir-comprobante`, data);
    }
    
} 