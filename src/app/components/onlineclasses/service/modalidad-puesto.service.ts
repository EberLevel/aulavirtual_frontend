import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModalidadPuestoService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las modalidades de puesto (con paginación)
  getModalidadesPuesto(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}modalidades-puesto/${domain_id}`, this.httpOptions);
  }

  // Obtener una modalidad de puesto por su ID
  getModalidadPuestoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}modalidad-puesto/${id}`, this.httpOptions);
  }

  // Crear una nueva modalidad de puesto
  guardarModalidadPuesto(modalidadPuestoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}modalidad-puesto`, modalidadPuestoData, this.httpOptions);
  }

  // Actualizar una modalidad de puesto por su ID
  actualizarModalidadPuesto(id: number, modalidadPuestoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}modalidad-puesto/${id}`, modalidadPuestoData, this.httpOptions);
  }

  // Eliminar una modalidad de puesto por su ID
  eliminarModalidadPuesto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}modalidad-puesto/${id}`, this.httpOptions);
  }
}
