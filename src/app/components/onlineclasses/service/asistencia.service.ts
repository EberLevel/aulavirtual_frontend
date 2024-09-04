import { Injectable } from '@angular/core';
import {
    HttpBackend,
    HttpClient,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AsistenciaService {
    // Usa solo una variable para la URL base
    private baseUrl = `${environment.API_BASE}`;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private httpClientFormData: HttpClient,
        public handler: HttpBackend
    ) {
        this.httpClientFormData = new HttpClient(this.handler);
    }

    getAsistenciaCurso(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });

        // Definir los parámetros de la solicitud
        const params = new HttpParams()
            .set('curso_id', data.curso_id)
            .set('domain_id', data.domain_id)
            .set('fecha', data.fecha);

        // Hacer la solicitud GET con los parámetros y encabezados
        return this.http.get<any>(`${this.baseUrl}asistencia-curso`, {
            params: params,
            headers: headers,
        });
    }
    getFechasCursoHorario(
        cursoId: number,
        docenteId: number,
        domainId: number
    ): Observable<any> {
        const params = new HttpParams()
            .set('curso_id', cursoId)
            .set('docente_id', docenteId)
            .set('domain_id', domainId);

        return this.http.get<any>(`${this.baseUrl}get-fechas-curso-horario`, {
            params: params,
        });
    }

    // Método para actualizar la asistencia del curso
    updateAsistenciaCurso(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}asistencia-curso-marcar`, data);
    }
}
