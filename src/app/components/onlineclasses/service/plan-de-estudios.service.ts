import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PlanDeEstudiosService {
    private baseUrl = `${environment.API_BASE}planes/`;

    constructor(private http: HttpClient) {}

    // Obtener plan de estudios por carrera
    getPlanDeEstudioPorCarrera(carreraId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}carrera/${carreraId}`);
    }
}
