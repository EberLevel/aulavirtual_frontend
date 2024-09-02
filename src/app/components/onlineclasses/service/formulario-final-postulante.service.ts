import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormularioFinalPostulanteService {
  private baseUrl = `${environment.API_BASE}`;
  private urlFormularioFinal = `${this.baseUrl}formulario-final-postulante/`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getDataCreate(): Observable<any> {
    return this.http.get(`${this.urlFormularioFinal}data-create`);
  }

  createFormulario(data: any): Observable<any> {
    return this.http.post(`${this.urlFormularioFinal}`, data, this.httpOptions);
  }
}
