import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private baseUrl = `${environment.API_BASE}`;    
  private urlparametro = `${environment.API_BASE}`;
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

  constructor(private http: HttpClient) {}

  getPromocionesByDomainId(domain_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}promociones/${domain_id}`);
  }

  guardarPromocion(promocionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}promociones`, promocionData);
  }

  actualizarPromocion(data: any, id: number) {
    return this.http.put(`${this.baseUrl}promociones/${id}`, data);
  }
}
