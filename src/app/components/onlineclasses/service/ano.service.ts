import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnoService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener los años por domain_id (con paginación)
  getAnos(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}anos/${domain_id}`, this.httpOptions);
  }

  // Obtener un año por su ID
  getAnoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}ano/${id}`, this.httpOptions);
  }

  // Crear un nuevo año
  guardarAno(anoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}ano`, anoData, this.httpOptions);
  }

  // Actualizar un año por su ID
  actualizarAno(id: number, anoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}ano/${id}`, anoData, this.httpOptions);
  }

  // Eliminar un año por su ID
  eliminarAno(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ano/${id}`, this.httpOptions);
  }
}
