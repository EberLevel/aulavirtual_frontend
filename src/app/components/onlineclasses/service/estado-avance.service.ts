import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EstadoAvanceService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getEstadosAvance(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}estados-avance/${domain_id}`, this.httpOptions);
  }

  getEstadoAvanceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}estado-avance/${id}`, this.httpOptions);
  }

  guardarEstadoAvance(estadoAvanceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}estado-avance`, estadoAvanceData, this.httpOptions);
  }

  actualizarEstadoAvance(id: number, estadoAvanceData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}estado-avance/${id}`, estadoAvanceData, this.httpOptions);
  }

  eliminarEstadoAvance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}estado-avance/${id}`, this.httpOptions);
  }
}
