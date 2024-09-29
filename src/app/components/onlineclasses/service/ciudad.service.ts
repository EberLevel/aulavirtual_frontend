import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private baseUrl = `${environment.API_BASE}`;  

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las ciudades filtradas por dominio.
   * @param domainId ID del dominio.
   * @returns Observable con la lista de ciudades.
   */
  getCiudadesByDomain(domainId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}ciudades/domain/${domainId}`);
  }

  /**
   * Obtener una ciudad por ID.
   * @param id ID de la ciudad.
   * @returns Observable con la información de la ciudad.
   */
  getCiudadById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  /**
   * Crear una nueva ciudad.
   * @param ciudad Datos de la ciudad.
   * @returns Observable con la respuesta de la creación.
   */
  guardarCiudad(ciudad: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}ciudades`,ciudad);
  }

  /**
   * Actualizar una ciudad existente.
   * @param ciudad Datos de la ciudad a actualizar.
   * @returns Observable con la respuesta de la actualización.
   */
  actualizarCiudad(ciudad: any): Observable<any> {
    return this.http.put(`${this.baseUrl}ciudades/${ciudad.id}`, ciudad);
  }

  /**
   * Eliminar una ciudad por ID.
   * @param id ID de la ciudad a eliminar.
   * @returns Observable con la respuesta de la eliminación.
   */
  eliminarCiudad(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ciudades/${id}`);
  }
}
