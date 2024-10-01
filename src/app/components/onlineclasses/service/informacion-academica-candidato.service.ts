import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../interface/general';

@Injectable({
    providedIn: 'root',
})
export class InformacionAcademicaCandidatoService {
    private baseUrl = `${environment.API_BASE}`; // Base URL del API

    constructor(private http: HttpClient) {}

    // Obtener información académica por dominio
    getInformacionAcademicaByDomainId(domain_id: number): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}informacion_academica/domain/${domain_id}`)
            .pipe(
                catchError((error) => {
                    console.error('Error al obtener la información académica:', error);
                    return throwError(error);
                })
            );
    }

    // Crear nueva información académica
    guardarInformacionAcademica(data: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}informacion_academica`, data)
            .pipe(
                catchError((error) => {
                    console.error('Error al guardar la información académica:', error);
                    return throwError(error);
                })
            );
    }

    // Actualizar información académica
    actualizarInformacionAcademica(id: number, data: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(`${this.baseUrl}informacion_academica/${id}`, data)
            .pipe(
                catchError((error) => {
                    console.error('Error al actualizar la información académica:', error);
                    return throwError(error);
                })
            );
    }

    // Eliminar información académica
    eliminarInformacionAcademica(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}informacion_academica/${id}`)
            .pipe(
                catchError((error) => {
                    console.error('Error al eliminar la información académica:', error);
                    return throwError(error);
                })
            );
    }

    // Obtener información académica por ID (para detalles o edición)
    getInformacionAcademicaById(id: number): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}informacion_academica/${id}`)
            .pipe(
                catchError((error) => {
                    console.error('Error al obtener la información académica por ID:', error);
                    return throwError(error);
                })
            );
    }
}
