import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class InformacionAcademicaService {
    private baseUrl = `${environment.API_BASE}`;
    private urlInformacionAcademica = `${this.baseUrl}informacion-academica/`;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // Variables para almacenar los datos de descripción
    gradosInstruccion: any[] = [];
    profesiones: any[] = [];
    estadoAvances: any[] = [];

    constructor(
        private http: HttpClient,
        private httpClientFormData: HttpClient,
        public handler: HttpBackend,
    ) {
        this.httpClientFormData = new HttpClient(this.handler);
    }

    // Método para obtener los datos necesarios para el formulario de creación y almacenarlos
    getDataCreate(domainId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}informacion-academica/data-create/${domainId}`).pipe(
            tap((data: any) => {
                this.gradosInstruccion = data.gradosInstruccion;
                this.profesiones = data.profesiones;
                this.estadoAvances = data.estadoAvances;
            })
        );
    }

    getInformacionAcademica(): Observable<any> {
        return this.http.get(`${this.urlInformacionAcademica}`, this.httpOptions);
    }

    getInformacionAcademicaByPostulante(idPostulante: number): Observable<any> {
        return this.http.get(`${this.baseUrl}informacion-academica/${idPostulante}`, this.httpOptions);
    }

    getInformacionAcademicaByDomain(domain_id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}informacion-academica/domain/${domain_id}`, this.httpOptions);
    }

    guardarInformacionAcademica(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}informacion-academica`, data, this.httpOptions);
    }

    actualizarInformacionAcademica(data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}informacion-academica/${data.id}`, data, this.httpOptions);
    }

    eliminarInformacionAcademica(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}informacion-academica/${id}`, this.httpOptions);
    }
}
