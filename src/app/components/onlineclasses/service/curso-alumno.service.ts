import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class CursoAlumnoService {
    private baseUrl = `${environment.API_BASE}`;
    private urlparametro = `${environment.API_BASE}`;
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

    getCursosByAlumno(alumnoId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}cursosByAlumno/${alumnoId}`);
    }

    getAlumnoById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}alumno/${id}`);
    }

    getCursosByPlanEstudioYCarrera(
        planEstudioId: number,
        carreraId: number
    ): Observable<any> {
        const url = `${this.baseUrl}cursos/plan-estudio/${planEstudioId}/${carreraId}`;
        return this.http.get(url);
    }
}
