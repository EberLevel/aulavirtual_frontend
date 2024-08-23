import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient,HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { tap,map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse, Base } from '../interface/general';
@Injectable({
    providedIn: 'root',
})
export class HorarioService{
    private baseUrl = `${environment.API_BASE}`;    
    private urlparametro = `${environment.API_BASE}`;
    constructor(private http: HttpClient) { 

    }
    saveHorario(horario: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}horario`, horario);
    }
    getHorario(idCurso:any): Observable<ApiResponse> { 
        return this.http.get<ApiResponse>(`${this.baseUrl}horario/${idCurso}`);
    }
    
}