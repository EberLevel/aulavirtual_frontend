import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PreguntaAlumnoService {
  
  private baseUrl = `${environment.API_BASE}`;
  private urlparametro = `${environment.API_BASE}`;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de preguntas por ID de evaluación
  getListadoDePreguntasPorCorregir(preguntaId: number): Observable<any> {
    const url = `${this.baseUrl}preguntasByAlumno/${preguntaId}`;
    return this.http.get(url);
  }
    // Nuevo método para actualizar el estado de la pregunta
    actualizarEstadoPregunta(data: { pregunta_id: number, alumno_id: number, estado_id: number }): Observable<any> {
      return this.http.put(`${this.baseUrl}pregunta-alumno`, data);
    }
    
  
}
