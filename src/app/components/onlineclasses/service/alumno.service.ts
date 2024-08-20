import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse, Base } from '../interface/general';
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
    editAlumno(formData:FormData,data:any):Observable<any>{
             
         return this.http.put(`${this.baseUrl}alumnos/${data.id}/${data.domain_id}`,formData);
    }
    showAlumno(data:any):Observable<any>{
        return this.http.get(`${this.baseUrl}alumnos/${data.id}/${data.domain_id}`);
    }
    
} 