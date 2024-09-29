import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CandidatoService {
  private baseUrl = `${environment.API_BASE}`;  

  constructor(private http: HttpClient) {}

  getCandidatos(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}candidatos/domain/${domain_id}`);
  }

  getCandidatoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}candidatos/${id}`);
  }
  
  getCandidatosByCiudad(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}candidatos/ciudad/${id}`);
  }
  getCiudadByCandidato(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getCiudadByCandidato/${id}`);
  }
  guardarCandidato(candidatoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}candidatos`, candidatoData);
  }

  actualizarCandidato(id: number, candidatoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}candidatos/${id}`, candidatoData);
  }

  eliminarCandidato(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}candidatos/${id}`);
  }

  getDataCreate(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}candidatos/data/create/${domain_id}`);
  }
}
