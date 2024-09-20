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
import { Miembro } from 'src/app/components/onlineclasses/interface/general';
import { GeneralService } from 'src/app/components/onlineclasses/service/general.service';
import Swal from 'sweetalert2';
import { AgregarEditarGrupoEvaluacionesComponent } from '../ver-g-ev/agregar-editar-grupo-evaluaciones/agregar-editar-grupo-evaluaciones.component';
import { VerListadoDeEvaluacionesPorGrupoComponent } from '../ver-lis-eval-grupo/ver-lis-eval-grupo.component';
import { VerLisEvalGrupoAlumnoComponent } from '../ver-lis-eval-grupo-alumno/ver-lis-eval-grupo-alumno.component';

@Component({
    selector: 'app-ver-g-ev-alumno',
    templateUrl: './ver-g-ev-alumno.component.html',
    styleUrls: ['./ver-g-ev-alumno.component.scss'],
})
export class VerGEvAlumnoComponent {
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
    grupoEvaluaciones: any;

    constructor(
        private dialogService: DialogService,
        private grupoEvaluacionesService: GeneralService,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
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
            this.grupoEvaluacionesService
                .getGrupoEvaluaciones({ id: this.grupoEvaluaciones.id })
                .subscribe((response: any) => {
                    this.grupoEvaluacionesList = response;
                    this.originalgrupoEvaluacionesList = [...response];
    
                    // Llamar a getPromedioPorAlumno para cada grupo de evaluaciones en la lista
                    this.grupoEvaluacionesList.forEach(grupo => {
                        this.getPromedioPorAlumno(grupo.id, this.grupoEvaluaciones.alumnoId);
                    });
                });
            console.log(
                'ID de grupo para obtener evaluaciones:',
                this.grupoEvaluaciones.id
            );
        } else {
            console.error(
                'No se pudo listar las evaluaciones porque el ID de grupo es inválido o no está definido.'
            );
        }
    }   

    // Función para obtener el promedio por alumno
    getPromedioPorAlumno(grupoId: number, alumnoId: number): void {
        console.log("Obteniendo promedio para Grupo ID:", grupoId, "Alumno ID:", alumnoId);
    
        this.grupoEvaluacionesService
            .getPromedioPorAlumno(alumnoId, grupoId)
            .subscribe(
                (response: any) => {
                    if (response.success) {
                        console.log('Promedio recibido para Grupo ID:', grupoId, response.promedio); // Verificar si recibimos el promedio
                        // Buscar el grupo correspondiente en la lista y asignar el promedio
                        this.grupoEvaluacionesList.forEach((grupo) => {
                            if (grupo.id === grupoId) {
                                grupo.promedio_por_alumno = response.promedio; // Asignar el promedio
                            }
                        });
                    } else {
                        console.error('Error al obtener el promedio del alumno para el Grupo ID:', grupoId);
                    }
                },
                (error) => {
                    console.error('Error en la solicitud del promedio para Grupo ID:', grupoId, error);
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

    agregarEvaluaciones(evaluaciones: any) {
        this.ref = this.dialogService.open(VerLisEvalGrupoAlumnoComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                idCurso: this.grupoEvaluaciones.id,
                data: evaluaciones,
                alumnoId: this.grupoEvaluaciones.alumnoId,
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarGrupoEvaluaciones();
        });
    }
}
