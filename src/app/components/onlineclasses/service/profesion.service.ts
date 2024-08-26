import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfesionService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las profesiones (con paginación)
  getProfesiones(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}profesiones/${domain_id}`, this.httpOptions);
  }

  // Obtener una profesión por su ID
  getProfesionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}profesion/${id}`, this.httpOptions);
  }

  // Crear una nueva profesión
  guardarProfesion(profesionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}profesion`, profesionData, this.httpOptions);
  }

  // Actualizar una profesión por su ID
  actualizarProfesion(id: number, profesionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}profesion/${id}`, profesionData, this.httpOptions);
  }

  // Eliminar una profesión por su ID
  eliminarProfesion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}profesion/${id}`, this.httpOptions);
  }
}
