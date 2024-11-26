import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Base } from '../interface/general';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private baseUrl = `${environment.API_BASE}`
  private urlparametro = `${environment.API_BASE}`

  constructor(
    private http: HttpClient,
    private httpClientFormData: HttpClient,
    private handler: HttpBackend
  ) {
    this.httpClientFormData = new HttpClient(this.handler)
  }

  listarPagos(domain_id: number): Observable<any> {
    return this.http
      .get<Base>(`${this.baseUrl}pagos/${domain_id}`)
      .pipe(
        map((response: Base) => {
          if (response.responseCode === 200) {
            return response.response;
          } else {
            throw new Error(response.msgResultado);
          }
        })
      )
  }

  listarAlumnos(domain_id: number): Observable<any> {
    console.log(domain_id);

    return this.http
      .get(`${this.baseUrl}alumnos/${domain_id}`);
  }

  listarPagoVinculadoPorAlumno(domain_id: number, pago_id: number): Observable<any> {
    console.log(domain_id);

    return this.http
      .get(`${this.baseUrl}pagos/${domain_id}/${pago_id}/alumnos`);
  }

  listarCiclos(domain_id: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}ciclos/${domain_id}`);
  }

  guardarPago(pago: any): Observable<any> {

    console.log(pago);

    return this.http
      .post(`${this.baseUrl}pagos`, pago);
  }

  vincularPagoAlumnos(pagoAlumnos: object): Observable<any> {
    return this.http
      .post(`${this.baseUrl}asignar-pagos`, pagoAlumnos);
  }

  confirmPayment(domain_id: number, alumno_id: number, pago_id: number): Observable<any> {
    console.log(domain_id);
    
    const datosValidar = {
      alumno_id,
      pago_id
    }

    return this.http
      .post(`${this.baseUrl}pagos/${domain_id}/validar-pago`, datosValidar);
  }
}
