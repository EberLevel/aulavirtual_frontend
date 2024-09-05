import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InstitucionService {
  private baseUrl = `${environment.API_BASE}`; 

  constructor(private http: HttpClient) {}

  getInstituciones(domain_id: number) {
    return this.http.get(`${this.baseUrl}instituciones?domain_id=${domain_id}`);
  }

  guardarInstitucion(data: any) {
    return this.http.post(`${this.baseUrl}instituciones`, data);
  }

  actualizarInstitucion(id: number, data: any) {
    return this.http.put(`${this.baseUrl}instituciones/${id}`, data);
  }

  eliminarInstitucion(id: number) {
    return this.http.delete(`${this.baseUrl}instituciones/${id}`);
  }
}
