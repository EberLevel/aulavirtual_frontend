import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { tap, map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiResponse, Base } from '../interface/general';
import { HelpersService } from 'src/app/helpers.service';

@Injectable({
    providedIn: 'root',
})
export class GeneralService {
    private baseUrl = `${environment.API_BASE}`;
    private urlparametro = `${environment.API_BASE}`;
    private permisosSubject = new BehaviorSubject<any[]>([]);
    permisos$ = this.permisosSubject.asObservable();

    constructor(
        private http: HttpClient,
        private httpClientFormData: HttpClient,
        public handler: HttpBackend,
        private helpersService: HelpersService // Inyección del servicio
    ) {
        this.httpClientFormData = new HttpClient(this.handler);
    }

    getAllParametro() {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}parametros`)
            .pipe(
                map((response: ApiResponse) => {
                    if (response.responseCode === '0') {
                        return response.response;
                    } else {
                        throw new Error(response.responseMessage);
                    }
                })
            );
    }
    listarmiembros() {
        return this.http.get<Base>(`${this.baseUrl}parametros`).pipe(
            map((response: Base) => {
                if (response.responseCode === 0) {
                    return response.response;
                } else {
                    throw new Error(response.msgResultado);
                }
            })
        );
    }

    guardarCarreraTecnica(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}carreras`, parametro, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    

    editarCarreraTecnica(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}carreras/${parametro.id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    eliminarCarreraTecnica(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}carreras/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getTipoEvaluacion() {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}parametros?tx_nombre=TIPO EVALUACIÓN`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getTipoDePregunta() {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}parametros?tx_nombre=TIPO DE PREGUNTA`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getMaestros(domain_id: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}parametrosAll/${domain_id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    actualizarCurso(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}cursos/${parametro.cursoId}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    eliminarCurso(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}cursos/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getCursoById(id: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}cursos/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // // console.log('Response body curso:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getCursos(id: number) {
      return this.http
          .get<ApiResponse>(`${this.baseUrl}cursos/carrera/${id}`, {
              observe: 'response',
          })
          .pipe(
              tap((response: HttpResponse<ApiResponse>) => {
                  // console.log('HTTP Status Code:', response.status);
              }),
              map((response: HttpResponse<ApiResponse>) => {
                  // console.log('Response body:', response.body);
                  if (response.status === 200 && response.body) {
                      return response.body;
                  } else {
                      throw new Error(
                          response.body
                              ? response.body.responseMessage
                              : 'Unknown error'
                      );
                  }
              })
          );
  }
  

    getSyllabusByCurso(idCurso: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}cursos/${idCurso}/syllabus`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // // console.log('Response body curso:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getTemaByCurso(idCurso: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}cursos/${idCurso}/tema`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // // console.log('Response body curso:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getAreaDeFormacion() {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}parametros?tx_nombre=area_de_formacion`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getModuloFormativo() {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}parametros?tx_nombre=MÓDULOS FORMATIVOS`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    getEstadoss() {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}parametros?tx_nombre=ESTADO CURSO`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getMaestrosRecursive(domain_id: number): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}parametrosRecursive/${domain_id}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarParametro(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}parametros/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarParametro(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}parametros`, parametro, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    updateParametro(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}parametros/${parametro.id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getGrupoEvaluaciones(parametro: any): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}grupo-de-evaluaciones/${parametro.id}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarGrupoEvaluaciones(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.baseUrl}grupo-de-evaluaciones`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarGrupoEvaluaciones(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}grupo-de-evaluaciones/${parametro.id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarGrupoEvaluaciones(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}grupo-de-evaluaciones/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    // Obtén permisos del backend

    fetchPermisos(rolId: number, domainId: any): void {
        this.http
            .get<any[]>(
                `${this.urlparametro}rol/get-rol-permiso/${rolId}/${domainId}`
            )
            .subscribe((permisos) => {
                this.permisosSubject.next(permisos);
            });
    }

    // Verifica si el usuario tiene un permiso específico
    tienePermiso(nombrePermiso: string): boolean {
        const permisos = this.permisosSubject.getValue();
        return permisos.some((permiso) => permiso.nombre === nombrePermiso);
    }

    getCarrerasTecnicas(domain_id: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}carreras-list/${domain_id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarCurso(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}cursos`, parametro, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getCiclo() {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}parametros?tx_nombre=ciclos`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getRoles(domainId: any) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}roles/${domainId}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getRol(id: number) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}rol/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarRol(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.urlparametro}rol/guardar`, parametro, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarRolPermisos(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.urlparametro}rol/guardar-permiso`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarRol(parametro: any, id: number): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.urlparametro}rol/guardar/${id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarRol(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.urlparametro}rol/eliminar/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                }),
                catchError((error) => {
                    console.error('Error occurred:', error);
                    return throwError(error);
                })
            );
    }

    getEmpresasDropdown() {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}empresas-dropdown`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getEmpresas() {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}empresas`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getEmpresa(id: number) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}empresa/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarEmpresa(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.urlparametro}empresa/guardar`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarEmpresa(parametro: any, id: number): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.urlparametro}empresa/guardar/${id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarEmpresa(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.urlparametro}empresa/eliminar/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                }),
                catchError((error) => {
                    console.error('Error occurred:', error);
                    return throwError(error);
                })
            );
    }

    getPermisos(dominio_id: any) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}permisos/${dominio_id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getRolPermisos(rolId: number, domain_id: number): Observable<any[]> {
        return this.http
            .get<any>(
                `${this.urlparametro}rol/get-rol-permiso/${rolId}/${domain_id}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<any>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<any>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body?.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getListadoDeEvaluacionesPorGrupo(parametro: any): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}evaluaciones/${parametro.id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    guardarEvaluacion(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}evaluaciones`, parametro, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarListadoDeEvaluacionesPorGrupo(
        parametro: any
    ): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}evaluaciones/${parametro.id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    getAlumnosCurso(domainId: number, cursoId: number) {
        return this.http
            .get<any[]>(`${this.baseUrl}participantes/${domainId}/${cursoId}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<any[]>) => {
                    console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<any[]>) => {
                    console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;  // Si la respuesta es un array, la retornamos directamente
                    } else {
                        throw new Error('Error obteniendo los alumnos');
                    }
                })
            );
    }
    
    updateAlumnoCurso(data: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}participantes`, data, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarListadoDeEvaluacionesPorGrupo(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}evaluaciones/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getPreguntas(parametro: any): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${
                    this.baseUrl
                }preguntas/${this.helpersService.getDominioId()}/${
                    parametro.id
                }`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarPreguntas(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.baseUrl}preguntas`, parametro, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarPreguntas(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}preguntas/${parametro.id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarPreguntas(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.baseUrl}preguntas/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getCiclos(): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}ciclos/${this.helpersService.getDominioId()}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarCiclos(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.baseUrl}ciclos/${this.helpersService.getDominioId()}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarCiclos(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}ciclos/${this.helpersService.getDominioId()}/${
                    parametro.id
                }`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarCiclos(parametro: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(
                `${
                    this.baseUrl
                }ciclos/${this.helpersService.getDominioId()}/${parametro}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getEstadoDeCurso(): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${
                    this.baseUrl
                }estados-curso/${this.helpersService.getDominioId()}`,
                { observe: 'response' }
            )

            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarEstadoDeCurso(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${
                    this.baseUrl
                }estados-curso/${this.helpersService.getDominioId()}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarEstadoDeCurso(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${
                    this.baseUrl
                }estados-curso/${this.helpersService.getDominioId()}/${
                    parametro.id
                }`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarEstadoDeCurso(parametro: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(
                `${
                    this.baseUrl
                }estados-curso/${this.helpersService.getDominioId()}/${parametro}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getEstados(): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}estados/${this.helpersService.getDominioId()}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarEstados(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.baseUrl}estados/${this.helpersService.getDominioId()}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarEstados(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.baseUrl}estados/${this.helpersService.getDominioId()}/${
                    parametro.id
                }`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarEstados(parametro: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(
                `${
                    this.baseUrl
                }estados/${this.helpersService.getDominioId()}/${parametro}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getModulosFormativos(): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${
                    this.baseUrl
                }modulos-formativos/${this.helpersService.getDominioId()}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarModulosFormativos(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${
                    this.baseUrl
                }modulos-formativos/${this.helpersService.getDominioId()}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarModulosFormativos(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${
                    this.baseUrl
                }modulos-formativos/${this.helpersService.getDominioId()}/${
                    parametro.id
                }`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarModulosFormativos(parametro: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(
                `${
                    this.baseUrl
                }modulos-formativos/${this.helpersService.getDominioId()}/${parametro}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getAreasDeFormacion(): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${
                    this.baseUrl
                }areas-de-formacion/${this.helpersService.getDominioId()}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarAreasDeFormacion(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${
                    this.baseUrl
                }areas-de-formacion/${this.helpersService.getDominioId()}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarAreasDeFormacion(parametro: any): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${
                    this.baseUrl
                }areas-de-formacion/${this.helpersService.getDominioId()}/${
                    parametro.id
                }`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarAreasDeFormacion(parametro: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(
                `${
                    this.baseUrl
                }areas-de-formacion/${this.helpersService.getDominioId()}/${parametro}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    getCompany($domainId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}company/${$domainId}`);
    }
    saveCompany(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}company`, data);
    }

    getCursosByDocente(id: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}cursos-docente/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getCursosByAlumno(id: number) {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}cursos-alumno/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    updateOrdenCiclos(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}ciclos-orden`, data);
    }

    guardarPreguntaAlumno(parametro: any): Observable<ApiResponse> {
        return this.http
          .post<ApiResponse>(`${this.baseUrl}alumno-preguntas/`, parametro, {
            observe: 'response',
          })
          .pipe(
            tap((response: HttpResponse<ApiResponse>) => {
              console.log('HTTP Status Code:', response.status);
            }),
            map((response: HttpResponse<ApiResponse>) => {
              console.log('Response body:', response.body);
      
              // Si la respuesta tiene un status 200 o 201, la tratamos como éxito.
              if ((response.status === 201 || response.status === 200) && response.body) {
                return response.body;
              } else {
                // Lanzar un error solo si el status no es exitoso.
                throw new Error('Respuesta no válida o falta información del servidor.');
              }
            }),
            catchError((error) => {
              console.error('Error en la solicitud:', error);
              return throwError(() => new Error('Error en la solicitud al servidor'));
            })
          );
      }
         
    getListadoDeEvaluacionesPorCurso(parametro: any): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}cursos/${parametro.id}/evaluaciones`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    getSumaCalificaciones(alumnoId: number, evaluacionId: number) {
        return this.http.get(`${this.baseUrl}suma-calificaciones?alumno_id=${alumnoId}&evaluacion_id=${evaluacionId}`);
      }
    getListadoDePreguntasPorCorregir(parametro: any): Observable<ApiResponse> {
        return this.http
            .get<ApiResponse>(
                `${this.baseUrl}obtener-preguntas-corregidas/${parametro}`,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getOfertasLaborales() {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}ofertas-empleo`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    // eliminarOfertaLaboral
    eliminarOfertaLaboral(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.urlparametro}ofertas-empleo/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 204) {
                        return {} as ApiResponse;
                    } else if (response.status === 204 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                }),
                catchError((error) => {
                    console.error('Error occurred:', error);
                    return throwError(error);
                })
            );
    }

    guardarOfertaLaboral(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.urlparametro}ofertas-empleo`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }
    // getOfertaLaboral
    getOfertaLaboral(id: number) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}ofertas-empleo/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    // actualizarOfertaLaboral
    actualizarOfertaLaboral(parametro: any, id: number): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.urlparametro}ofertas-empleo/${id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getProyectos() {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}proyectos`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarProyecto(parametro: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.urlparametro}proyectos`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarProyecto(parametro: any, id: number): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.urlparametro}proyectos/${id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getProyecto(id: number) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}proyectos/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarProyecto(id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.urlparametro}proyectos/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 204) {
                        return {} as ApiResponse;
                    } else if (response.status === 204 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                }),
                catchError((error) => {
                    console.error('Error occurred:', error);
                    return throwError(error);
                })
            );
    }

    getTareas(proyecto_id: string) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}proyectos/${proyecto_id}/tareas`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    guardarTarea(parametro: any, proyectoId: any): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(
                `${this.urlparametro}proyectos/${proyectoId}/tareas`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 201 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    actualizarTarea(parametro: any, proyectoId: number, id: number): Observable<ApiResponse> {
        return this.http
            .put<ApiResponse>(
                `${this.urlparametro}proyectos/${proyectoId}/tareas/${id}`,
                parametro,
                { observe: 'response' }
            )
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    getTarea(proyectoId: number, id: number) {
        return this.http
            .get<ApiResponse>(`${this.urlparametro}proyectos/${proyectoId}/tareas/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 200 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                })
            );
    }

    eliminarTarea(proyectoId: number, id: number): Observable<ApiResponse> {
        return this.http
            .delete<ApiResponse>(`${this.urlparametro}proyectos/${proyectoId}/tareas/${id}`, {
                observe: 'response',
            })
            .pipe(
                tap((response: HttpResponse<ApiResponse>) => {
                    // console.log('HTTP Status Code:', response.status);
                }),
                map((response: HttpResponse<ApiResponse>) => {
                    // console.log('Response body:', response.body);
                    if (response.status === 204) {
                        return {} as ApiResponse;
                    } else if (response.status === 204 && response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            response.body
                                ? response.body.responseMessage
                                : 'Unknown error'
                        );
                    }
                }),
                catchError((error) => {
                    console.error('Error occurred:', error);
                    return throwError(error);
                })
            );
    }
}
