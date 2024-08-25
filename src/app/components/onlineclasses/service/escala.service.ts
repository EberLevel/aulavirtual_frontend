import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EscalaService {
  private baseUrl = `${environment.API_BASE}`; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getEscalas(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}escalas/${domain_id}`, this.httpOptions);
  }

  getEscalaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}escala/${id}`, this.httpOptions);
  }

  guardarEscala(escalaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}escala`, escalaData, this.httpOptions);
  }

  actualizarEscala(id: number, escalaData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}escala/${id}`, escalaData, this.httpOptions);
  }

  eliminarEscala(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}escala/${id}`, this.httpOptions);
  }
}
