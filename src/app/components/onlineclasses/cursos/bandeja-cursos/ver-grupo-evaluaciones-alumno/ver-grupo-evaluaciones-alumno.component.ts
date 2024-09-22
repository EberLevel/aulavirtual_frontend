import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {
    DynamicDialogRef,
    DialogService,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { AgregarEditarGrupoEvaluacionesComponent } from '../../../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-g-ev/agregar-editar-grupo-evaluaciones/agregar-editar-grupo-evaluaciones.component';
import { VerListadoDeEvaluacionesPorGrupoComponent } from '../../../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-lis-eval-grupo/ver-lis-eval-grupo.component';
import { Miembro } from '../../../interface/general';
import { GeneralService } from '../../../service/general.service';
import { VerLisEvalGrupoAlumnoComponent } from '../../../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-lis-eval-grupo-alumno/ver-lis-eval-grupo-alumno.component';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-ver-grupo-evaluaciones-alumno',
    templateUrl: './ver-grupo-evaluaciones-alumno.component.html',
    styleUrls: ['./ver-grupo-evaluaciones-alumno.component.scss'],
})
export class VerGrupoEvaluacionesAlumnoComponent {
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;
    @Input() miembro: Miembro[] = [];
    @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

    grupoEvaluacionesList: any[] = [];
    originalgrupoEvaluacionesList: any[] = [];

    ref: DynamicDialogRef | undefined;

    promedioTotal: number = 0;
    porcentajeTotal: number = 0;
    totalNotaPorcentual: number = 0;
    grupoEvaluaciones: any;
    alumnoId: any;

    constructor(
        private dialogService: DialogService,
        private grupoEvaluacionesService: GeneralService,
        private helpersService: HelpersService,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.alumnoId = this.helpersService.getAlumnoId();
        console.log('alumnoId', this.alumnoId);

        this.grupoEvaluaciones = this.config.data.data || this.config.data;

        console.log(
            'Datos recibidos en VerGEvAlumnoComponent:',
            this.grupoEvaluaciones
        );

        if (this.grupoEvaluaciones && this.grupoEvaluaciones.id) {
            console.log(
                'ID de curso recibido en VerGrupoEvaluacionesComponent:',
                this.grupoEvaluaciones.id
            );
            this.listarGrupoEvaluaciones();
        } else {
            console.error(
                'No se recibió un ID de curso válido en VerGrupoEvaluacionesComponent.'
            );
        }
    }

    listarGrupoEvaluaciones() {
        if (this.grupoEvaluaciones && this.grupoEvaluaciones.id) {
            this.grupoEvaluacionesService.getGrupoEvaluaciones({ id: this.grupoEvaluaciones.id }).subscribe((response: any) => {
                this.grupoEvaluacionesList = response;
                this.originalgrupoEvaluacionesList = [...response];
    
                // Llamar a getPromedioPorAlumno para cada grupo de evaluaciones en la lista
                this.grupoEvaluacionesList.forEach((grupo) => {
                    this.getPromedioPorAlumno(grupo.id);
                    this.obtenerEvaluacionesPorGrupo(grupo.id, this.alumnoId);
                });
            });
            console.log('ID de grupo para obtener evaluaciones:', this.grupoEvaluaciones.id);
        } else {
            console.error('No se pudo listar las evaluaciones porque el ID de grupo es inválido o no está definido.');
        }
    }
    

    // Función para obtener el promedio por alumno
    getPromedioPorAlumno(grupoId: number): void {
        console.log(
            'Obteniendo promedio para Grupo ID en getPromedioPorAlumno:',
            grupoId,
            'Alumno ID:',
            this.alumnoId
        );

        this.grupoEvaluacionesService
            .getPromedioPorAlumno(this.alumnoId, grupoId)
            .subscribe(
                (response: any) => {
                    if (response.success) {
                        console.log(
                            'Promedio recibido para Grupo ID:',
                            grupoId,
                            response.promedio
                        );
                        this.grupoEvaluacionesList.forEach((grupo) => {
                            if (grupo.id === grupoId) {
                                grupo.promedio_por_alumno = response.promedio;
                            }
                        });
                    } else {
                        console.error(
                            'Error al obtener el promedio del alumno para el Grupo ID:',
                            grupoId
                        );
                    }
                },
                (error) => {
                    console.error(
                        'Error en la solicitud del promedio para Grupo ID:',
                        grupoId,
                        error
                    );
                }
            );
    }

    calcularTotales() {
        let totalPromedio = 0;
        let totalPorcentaje = 0;
        this.grupoEvaluacionesList.forEach((carrera) => {
            totalPromedio += carrera.promedio || 0;
            totalPorcentaje += carrera.porcentaje || 0;
        });
        this.promedioTotal = totalPromedio / this.grupoEvaluacionesList.length;
        this.porcentajeTotal =
            totalPorcentaje / this.grupoEvaluacionesList.length;
    }

    navigateAddCurso() {
        this.ref = this.dialogService.open(
            AgregarEditarGrupoEvaluacionesComponent,
            {
                width: '60%',
                styleClass: 'custom-dialog-header',
                data: { acciones: 'add', idCurso: this.grupoEvaluaciones.id },
            }
        );

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(
            AgregarEditarGrupoEvaluacionesComponent,
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
            AgregarEditarGrupoEvaluacionesComponent,
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
                    .eliminarGrupoEvaluaciones(id)
                    .subscribe(
                        (response) => {
                            Swal.fire({
                                title: 'Eliminado',
                                text: 'La carrera técnica ha sido eliminada.',
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
                                'Hubo un problema al eliminar la carrera técnica.',
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
            (carrera) =>
                (carrera.codigo &&
                    carrera.codigo.toLowerCase().includes(filterValue)) ||
                (carrera.nombres &&
                    carrera.nombres.toLowerCase().includes(filterValue)) ||
                (carrera.cursos &&
                    carrera.cursos.toLowerCase().includes(filterValue))
        );
    }

    agregarEvaluaciones(carrera: any) {
        // Recibes el objeto carrera completo
        console.log('ID de carrera:', carrera.id); // Confirmar que estamos recibiendo el ID correcto

        this.ref = this.dialogService.open(VerLisEvalGrupoAlumnoComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                idCurso: carrera.id, // Usamos carrera.id directamente para idCurso
                data: carrera,
                alumnoId: this.alumnoId, // Asegúrate de que el alumnoId también esté correctamente definido
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }

    obtenerEvaluacionesPorGrupo(grupoId: number, alumnoId: number): void {
        this.grupoEvaluacionesService.getEvaluacionesPorGrupo(grupoId, alumnoId).subscribe(
            (response: any) => {
                console.log('Respuesta de la API:', response);
                if (response.success) {
                    this.calcularNotaPorcentualTotal(response.evaluaciones, grupoId);
                    
                    const notaTotal = this.calcularNotaTotal(response.evaluaciones);
                    // Actualiza el grupo correspondiente con la nota total
                    this.grupoEvaluacionesList.forEach(grupo => {
                        if (grupo.id === grupoId) {
                            grupo.nota_total = notaTotal; // Asigna la nota total al grupo
                        }
                    });
                } else {
                    console.error('Error al obtener las evaluaciones:', response.message);
                }
            },
            (error) => {
                console.error('Error en la solicitud de evaluaciones:', error);
            }
        );
    }
    
    
    
    
    // Método para sumar las notas porcentuales
    calcularNotaPorcentualTotal(evaluaciones: any[], grupoId: number): void {
        const totalNotaPorcentual = evaluaciones.reduce((total, evaluacion) => {
            return total + parseFloat(evaluacion.nota_porcentual);
        }, 0);
    
        // Actualiza solo el grupo correspondiente
        this.grupoEvaluacionesList.forEach(grupo => {
            if (grupo.id === grupoId) {
                grupo.nota_porcentual_total = totalNotaPorcentual; // Asigna el total al grupo
                console.log('Grupo actualizado:', grupo); // Verifica que el grupo tenga la propiedad
            }
        });
    
        console.log('Total Nota Porcentual para el grupo:', totalNotaPorcentual); // Verifica el total
    }
    calcularNotaTotal(evaluaciones: any[]): number {
        return evaluaciones.reduce((total, evaluacion) => {
            return total + parseFloat(evaluacion.nota);
        }, 0);
    }
    
    
    
    
}
