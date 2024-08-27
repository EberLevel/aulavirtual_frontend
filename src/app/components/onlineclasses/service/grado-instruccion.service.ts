import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GradoInstruccionService {
  private baseUrl = `${environment.API_BASE}`;

  constructor(private http: HttpClient) {}

  getGradoInstrucciones(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}grado-instrucciones/${domain_id}`);
  }

  eliminarGradoInstruccion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}grado-instruccion/${id}`);
  }

  guardarGradoInstruccion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}grado-instruccion`, data);
  }

  actualizarGradoInstruccion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}grado-instruccion/${id}`, data);
  }
}
