import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionModalidadService {
  private baseUrl = `${environment.API_BASE}`; // Define tu base URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener alumnos por evaluación
  obtenerAlumnosPorEvaluacion(evaluacionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}evaluacionesByalumnos/${evaluacionId}`, this.httpOptions);
  }

  // Guardar las notas de los alumnos
  guardarNotas(payload: { evaluacion_id: number; notas: { alumno_id: number; nota: number; }[] }): Observable<any> {
    return this.http.post(`${this.baseUrl}evaluacionesByalumnos/guardarNotas`, payload, this.httpOptions);
  }
}
