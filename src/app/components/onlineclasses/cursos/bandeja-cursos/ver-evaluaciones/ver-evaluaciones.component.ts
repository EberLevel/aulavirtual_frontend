import {
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { VerPreguntasComponent } from '../ver-preguntas/ver-preguntas.component';
import { VerListadoDeEvaluacionesPorGrupoComponent } from '../../../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-lis-eval-grupo/ver-lis-eval-grupo.component';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-ver-evaluaciones',
    templateUrl: './ver-evaluaciones.component.html',
    styleUrls: ['./ver-evaluaciones.component.scss'],
})
export class VerEvaluacionesComponent {
    loading: boolean = false;

    grupoEvaluacionesList: any[] = [];
    originalgrupoEvaluacionesList: any[] = [];

    ref: DynamicDialogRef | undefined;

    promedioTotal: number = 0;
    porcentajeTotal: number = 0;
    grupoEvaluaciones: any;
    alumno_id: any;

    // Definir el array de estados
    estados = [
        { name: 'Pendiente', value: 1 },
        { name: 'En Proceso', value: 2 },
        { name: 'Culminado', value: 3 },
    ];

    constructor(
        private dialogService: DialogService,
        private grupoEvaluacionesService: GeneralService,
        private helpersService: HelpersService,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        // Obtener el grupo de evaluaciones desde config
        this.grupoEvaluaciones = this.config.data.data;

        // Obtener el alumno_id desde HelpersService y asignarlo a la variable de la clase
        this.alumno_id = this.helpersService.getAlumnoId();
        this.listarGrupoEvaluaciones();
    }

    // Función para mapear el estado_id al nombre del estado
    obtenerEstadoNombre(estado_id: number): string {
        const estado = this.estados.find((e) => e.value === estado_id);
        return estado ? estado.name : 'Desconocido'; // Retornar 'Desconocido' si no coincide
    }

    listarGrupoEvaluaciones() {
        this.grupoEvaluacionesService
            .getListadoDeEvaluacionesPorCurso({ id: this.grupoEvaluaciones.id })
            .subscribe((response: any) => {
                this.grupoEvaluacionesList = response;
                this.originalgrupoEvaluacionesList = [...response];

                // Recorrer cada evaluación y obtener la suma de calificaciones para el alumno
                this.grupoEvaluacionesList.forEach((evaluacion) => {
                    console.log('Evaluacion:', evaluacion); // Verificar los valores dentro de evaluacion
                    const alumnoId = this.alumno_id; // Usar el alumno_id asignado en ngOnInit
                    const evaluacionId = evaluacion.id;

                    // Agregar el estado_nombre a cada evaluación basado en su estado_id
                    evaluacion.estado_nombre = this.obtenerEstadoNombre(
                        evaluacion.estado_id
                    );

                    console.log(
                        'alumno_id:',
                        alumnoId,
                        'evaluacion_id:',
                        evaluacionId
                    ); // Verificar si son undefined

                    // Si ambos valores están definidos, obtener la suma de calificaciones
                    if (alumnoId && evaluacionId) {
                        this.grupoEvaluacionesService
                            .getSumaCalificaciones(alumnoId, evaluacionId)
                            .subscribe((sumaResponse: any) => {
                                evaluacion.nota =
                                    sumaResponse.suma_calificaciones; // Asignar la suma a la nota
                            });
                    }
                });
            });
    }

    navigateToResponder(data: any) {}

    calcularTotales() {
        let totalPromedio = 0;
        let totalPorcentaje = 0;
        this.grupoEvaluacionesList.forEach((evaluacion) => {
            totalPromedio += evaluacion.promedio || 0;
            totalPorcentaje += evaluacion.porcentaje || 0;
        });
        this.promedioTotal = totalPromedio / this.grupoEvaluacionesList.length;
        this.porcentajeTotal =
            totalPorcentaje / this.grupoEvaluacionesList.length;
    }

    navigateAddCurso() {
        this.ref = this.dialogService.open(
            VerListadoDeEvaluacionesPorGrupoComponent,
            {
                width: '60%',
                styleClass: 'custom-dialog-header',
                data: {
                    acciones: 'add',
                    idGrupoEvaluaciones: this.grupoEvaluaciones.id,
                },
            }
        );

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(
            VerListadoDeEvaluacionesPorGrupoComponent,
            {
                width: '80%',
                styleClass: 'custom-dialog-header',
                data: {
                    acciones: 'ver',
                    idCurso: this.grupoEvaluaciones.id,
                    data: data,
                },
            }
        );

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }

    navigateToEdit(data: any) {
        this.ref = this.dialogService.open(
            VerListadoDeEvaluacionesPorGrupoComponent,
            {
                width: '60%',
                styleClass: 'custom-dialog-header',
                data: {
                    acciones: 'actualizar',
                    idCurso: this.grupoEvaluaciones.id,
                    data: data,
                },
            }
        );

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }

    navigateToDelete(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            customClass: {
                popup: 'custom-swal-popup',
            },
            didOpen: () => {
                const container = document.querySelector('.swal2-container');
                if (container) {
                    container.setAttribute(
                        'style',
                        'z-index: 2147483647 !important'
                    );
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                this.grupoEvaluacionesService
                    .eliminarListadoDeEvaluacionesPorGrupo(id)
                    .subscribe(
                        (response) => {
                            Swal.fire({
                                title: 'Eliminado',
                                text: 'La evaluacion técnica ha sido eliminada.',
                                icon: 'success',
                                showClass: {
                                    popup: `
                  background-color: #78CBF2;
                  color: white;
                  z-index: 10000!important;
                `,
                                },
                                didOpen: () => {
                                    const container =
                                        document.querySelector(
                                            '.swal2-container'
                                        );
                                    if (container) {
                                        container.setAttribute(
                                            'style',
                                            'z-index: 2147483647 !important'
                                        );
                                    }
                                },
                            });
                            this.listarGrupoEvaluaciones();
                        },
                        (error) => {
                            Swal.fire(
                                'Error',
                                'Hubo un problema al eliminar la evaluacion técnica.',
                                'error'
                            );
                        }
                    );
            }
        });
    }

    onGlobalFilter(event: Event) {
        const filterValue = (
            event.target as HTMLInputElement
        ).value.toLowerCase();
        if (!filterValue) {
            this.grupoEvaluacionesList = [
                ...this.originalgrupoEvaluacionesList,
            ];
            return;
        }

        this.grupoEvaluacionesList = this.originalgrupoEvaluacionesList.filter(
            (evaluacion) =>
                (evaluacion.codigo &&
                    evaluacion.codigo.toLowerCase().includes(filterValue)) ||
                (evaluacion.nombres &&
                    evaluacion.nombres.toLowerCase().includes(filterValue)) ||
                (evaluacion.cursos &&
                    evaluacion.cursos.toLowerCase().includes(filterValue))
        );
    }

    agregarPreguntas(evaluaciones: any) {
        this.ref = this.dialogService.open(VerPreguntasComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                acciones: 'alumno',
                grupoEvaluacionesId: this.grupoEvaluaciones.id,
                data: evaluaciones,
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }
}
