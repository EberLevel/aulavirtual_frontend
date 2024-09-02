import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostulanteService {
    private baseUrl = `${environment.API_BASE}`;    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(private http: HttpClient) {}
    getDataCreate(domain_id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}cvbanks/create-data/${domain_id}`);
    }
    getPostulanteById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}cvbanks/${id}`);
    }
    
    // Obtener los postulantes por dominio
    getPostulantes(domain_id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}cvbanksByDominio/${domain_id}`);
    }

    // Guardar un nuevo postulante
    guardarPostulante(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}cvbanks`, data, this.httpOptions);
    }

    // Actualizar un postulante existente
    actualizarPostulante(id: number, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}cvbanks/${id}`, data, this.httpOptions);
    }

    // Eliminar un postulante
    eliminarPostulante(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}cvbanks/${id}`, this.httpOptions);
    }
}
