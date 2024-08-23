import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class EvaluacionesService {
    private baseUrl = `${environment.API_BASE}`;
    private urlparametro = `${environment.API_BASE}`;

    constructor(private http: HttpClient) {}

    // Obtener evaluación por ID
    obtenerEvaluacionPorId(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}evaluacion/${id}`);
    }

    crearEvaluacion(evaluacion: any): Observable<any> {
        return this.http.post(`${this.baseUrl}evaluaciones`, evaluacion);
    }

    // Obtener evaluaciones por grupo
    obtenerEvaluacionesPorGrupo(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    // Actualizar evaluación
    actualizarEvaluacion(id: number, evaluacion: any): Observable<any> {
        return this.http.put(`${this.baseUrl}evaluacion/${id}`, evaluacion);
    }

    // Eliminar evaluación
    eliminarEvaluacion(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
