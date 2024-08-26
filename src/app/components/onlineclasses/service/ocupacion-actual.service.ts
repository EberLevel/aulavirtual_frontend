import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OcupacionActualService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getOcupacionesActuales(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}ocupaciones-actuales/${domain_id}`, this.httpOptions);
  }

  getOcupacionActualById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}ocupacion-actual/${id}`, this.httpOptions);
  }

  guardarOcupacionActual(ocupacionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}ocupacion-actual`, ocupacionData, this.httpOptions);
  }

  actualizarOcupacionActual(id: number, ocupacionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}ocupacion-actual/${id}`, ocupacionData, this.httpOptions);
  }

  eliminarOcupacionActual(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ocupacion-actual/${id}`, this.httpOptions);
  }
}
