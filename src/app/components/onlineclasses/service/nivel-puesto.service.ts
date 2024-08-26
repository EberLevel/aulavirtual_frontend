import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NivelPuestoService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener todos los niveles de cargo (con paginación)
  getNivelesCargo(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}niveles-cargo/${domain_id}`, this.httpOptions);
  }

  // Obtener un nivel de cargo por su ID
  getNivelCargoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}nivel-cargo/${id}`, this.httpOptions);
  }

  // Crear un nuevo nivel de cargo
  guardarNivelCargo(nivelCargoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}nivel-cargo`, nivelCargoData, this.httpOptions);
  }

  // Actualizar un nivel de cargo por su ID
  actualizarNivelCargo(id: number, nivelCargoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}nivel-cargo/${id}`, nivelCargoData, this.httpOptions);
  }

  // Eliminar un nivel de cargo por su ID
  eliminarNivelCargo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}nivel-cargo/${id}`, this.httpOptions);
  }
}
