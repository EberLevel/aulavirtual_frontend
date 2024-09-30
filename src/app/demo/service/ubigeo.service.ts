import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UbigeoService {
    private baseUrl = `${environment.API_BASE}`;

    constructor(private http: HttpClient) {}


    // Obtener todos los departamentos
    getDepartamentos(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}departamentos`).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    // Obtener las provincias de un departamento específico
    getProvincias(departamentoId: string): Observable<any> {
        return this.http
            .get<any>(
                `${this.baseUrl}departamentos/${departamentoId}/provincias`
            )
            .pipe(
                map((response: any) => {
                    return response;
                })
            );
    }

    // Obtener los distritos de una provincia específica dentro de un departamento
    getDistritos(departamentoId: string, provinciaId: string): Observable<any> {
        return this.http
            .get<any>(
                `${this.baseUrl}departamentos/${departamentoId}/provincias/${provinciaId}/distritos`
            )
            .pipe(
                map((response: any) => {
                    return response;
                })
            );
    }
}
