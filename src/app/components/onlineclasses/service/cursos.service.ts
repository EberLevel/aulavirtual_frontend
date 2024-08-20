import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class CursoService {
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

    getCursosPorAlumno(alumnoId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}cursos-alumno/${alumnoId}`);
    }
}
