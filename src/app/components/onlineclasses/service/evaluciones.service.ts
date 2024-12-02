import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class EvaluacionesService {
    private baseUrl = `${environment.API_BASE}`;
    private urlparametro = `${environment.API_BASE}`;

    constructor(private http: HttpClient) { }

    // Obtener evaluación por ID
    obtenerEvaluacionPorId(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}evaluacion/${id}`);
    }

    crearEvaluacion(evaluacion: any, recursos: File[]): Observable<any> {

        const formData = new FormData();

        formData.append('nombre', evaluacion.nombre);
        formData.append('tipo_evaluacion_id', evaluacion.tipo_evaluacion_id);
        formData.append('fecha_y_hora_programo', evaluacion.fecha_y_hora_programo);
        formData.append('observaciones', evaluacion.observaciones);
        formData.append('texto_enrriquesido', evaluacion.textoEnrriquesido);
        formData.append('estado_id', evaluacion.estado_id);
        formData.append('modalidad', evaluacion.modalidad);
        formData.append('domain_id', evaluacion.domain_id);
        formData.append('grupo_de_evaluaciones_id', evaluacion.grupo_de_evaluaciones_id);
        formData.append('porcentaje_asignado', evaluacion.porcentaje_asignado);

        console.log(recursos);
        

        recursos.forEach(file => {
            formData.append('recursos[]', file, file.name);  // 'archivos' es el nombre del campo que espera el backend
        });

        console.log(evaluacion, recursos);

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
        
        return this.http.post(`${this.baseUrl}evaluaciones`, formData);
    }
    // Actualizar evaluación
    actualizarEvaluacion(id: number, evaluacion: any, recursos: File[]): Observable<any> {

        console.log('recursos:', recursos);

        const formData = new FormData();
        
        formData.append('nombre', evaluacion.nombre);
        formData.append('tipo_evaluacion_id', evaluacion.tipo_evaluacion_id);
        formData.append('fecha_y_hora_programo', evaluacion.fecha_y_hora_programo);
        formData.append('observaciones', evaluacion.observaciones);
        formData.append('texto_enrriquesido', evaluacion.textoEnrriquesido);
        formData.append('estado_id', evaluacion.estado_id);
        formData.append('modalidad', evaluacion.modalidad);
        formData.append('domain_id', evaluacion.domain_id);
        formData.append('grupo_de_evaluaciones_id', evaluacion.grupo_de_evaluaciones_id);
        formData.append('porcentaje_asignado', evaluacion.porcentaje_asignado);

        recursos.forEach(file => {
            formData.append('recursos[]', file, file.name);  // 'archivos' es el nombre del campo que espera el backend
        });

        console.log(evaluacion, recursos);

        console.log(formData);
        

        return this.http.post(`${this.baseUrl}evaluacion/${id}`, formData, {
            headers: {
                Accept: 'application/json'
            }
            
        });
    }
    // Obtener evaluaciones por grupo
    obtenerEvaluacionesPorGrupo(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }



    // Eliminar evaluación
    eliminarEvaluacion(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    uploadFiles(files: File[]): Observable<any> {
        const formData = new FormData(); // Usamos FormData para enviar los archivos

        // Agregar los archivos al FormData
        files.forEach(file => {
            formData.append('files[]', file, file.name);
        });

        // Realizar la solicitud POST a Laravel con el FormData
        return this.http.post(`${this.baseUrl}/evaluaciones/recursos`, formData);
    }
}
