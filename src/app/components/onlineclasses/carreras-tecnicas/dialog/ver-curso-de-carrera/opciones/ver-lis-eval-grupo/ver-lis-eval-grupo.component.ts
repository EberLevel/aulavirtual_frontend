import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { Miembro } from '../../../../../interface/general';
import { Table } from 'primeng/table';
import {
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { GeneralService } from '../../../../../service/general.service';
import { Router } from '@angular/router';
import { RegCursosComponent } from '../../../../../cursos/dialog/reg-cursos/reg-cursos.component';
import Swal from 'sweetalert2';
import { VerListadoDePreguntasComponent } from '../ver-listado-de-preguntas/ver-listado-de-preguntas.component';
import { RegEvaluacionDocenteComponent } from '../../../../../docentes/evaluaciones-docente-menu/dialog/reg-evaluacion-docente/reg-evaluacion-docente.component';
import { ListadoEvaluacionPresencialComponent } from '../listado-evaluacion-presencial/listado-evaluacion-presencial.component';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-ver-lis-eval-grupo',
    templateUrl: './ver-lis-eval-grupo.component.html',
    styleUrls: ['./ver-lis-eval-grupo.component.scss'],
})
export class VerListadoDeEvaluacionesPorGrupoComponent {
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;
    @Input() miembro: Miembro[] = [];
    @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

    grupoEvaluacionesList: any[] = [];
    filteredExamenes: any[] = [];
    originalgrupoEvaluacionesList: any[] = [];

    ref: DynamicDialogRef | undefined;

    promedioTotal: number = 0;
    porcentajeTotal: number = 0;
    grupoEvaluaciones: any;
    evaluacion: any;
    recursos: any[] = [];  // Lista de recursos
    mostrarModalRecursos: boolean = false;  // Controla la visibilidad del modal
    filterType: number = 0;
    // Variable para almacenar el texto de búsqueda
    searchText: string = '';

    constructor(
        public helpersService: HelpersService,
        private dialogService: DialogService,
        private grupoEvaluacionesService: GeneralService,
        private router: Router,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit(): void {
        this.grupoEvaluaciones = this.config.data.data;
        console.log(this.grupoEvaluaciones, 'car');
        this.listarGrupoEvaluaciones();
    }

    listarGrupoEvaluaciones() {
        this.grupoEvaluacionesService
            .getListadoDeEvaluacionesPorGrupo({ id: this.grupoEvaluaciones.id })
            .subscribe(
                (response: any) => {
                    console.log('Datos de evaluaciones recibidos:', response);
                    this.grupoEvaluacionesList = response;
                    this.originalgrupoEvaluacionesList = [...response];
                },
                (error: any) => {
                    console.error('Error al listar evaluaciones:', error);
                }
            );
    }

    getModalidad(modalidad: number): string {
        return modalidad === 0 ? 'Presencial' : 'Remoto';
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
        this.ref = this.dialogService.open(RegEvaluacionDocenteComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                acciones: 'registrar',
                idGrupoEvaluaciones: this.grupoEvaluaciones.id,
            },
        });

        this.ref.onClose.subscribe(() => {
            this.listarGrupoEvaluaciones();
        });
    }

    navigateToEdit(evaluacion: any) {
        if (!evaluacion || !evaluacion.id) {
            console.error('Evaluación no válida o sin ID', evaluacion);
            return;
        }

        this.ref = this.dialogService.open(RegEvaluacionDocenteComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                acciones: 'actualizar',
                idEvaluacion: evaluacion.id,
                data: evaluacion,
            },
        });

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
                (carrera.nombre &&
                    carrera.nombre.toLowerCase().includes(filterValue)) ||
                (carrera.tipo_evaluacion_nombre &&
                    carrera.tipo_evaluacion_nombre.toLowerCase().includes(filterValue))
        );
    }

    agregarPreguntas(evaluaciones: any) {
        if (evaluaciones.modalidad === 0) {
            // Si la modalidad es Presencial
            this.ref = this.dialogService.open(
                ListadoEvaluacionPresencialComponent,
                {
                    // Abre otro componente
                    width: '60%',
                    styleClass: 'custom-dialog-header',
                    data: {
                        acciones: 'add',
                        grupoEvaluacionesId: this.grupoEvaluaciones.id,
                        data: evaluaciones,
                        evaluacionId: evaluaciones.id,
                    },
                }
            );
        } else {
            // Si la modalidad no es Presencial
            this.ref = this.dialogService.open(VerListadoDePreguntasComponent, {
                width: '60%',
                styleClass: 'custom-dialog-header',
                data: {
                    acciones: 'add',
                    grupoEvaluacionesId: this.grupoEvaluaciones.id,
                    data: evaluaciones,
                },
            });
        }

        this.ref.onClose.subscribe((data: any) => {
            console.log(
                'Modal cerrado, recargando la lista de evaluaciones...'
            );
            this.listarGrupoEvaluaciones();
        });
    }

    mostrarRecursos(evaluacion: any) {
        console.log(evaluacion);
        console.log(evaluacion.id);

        this.mostrarModalRecursos = true;

        this.grupoEvaluacionesService.getEvaluacionPorId(evaluacion.id).subscribe((data: any) => {
            this.recursos = JSON.parse(data.contenido) ?? [];  // Convierte el string JSON a un array de URLs
            console.log(this.recursos);
        })
    }

    isImage(url: string): boolean {
        return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    }

    // Método para verificar si el recurso es un video
    isVideo(url: string): boolean {
        return url.match(/\.(mp4)$/) !== null;
    }

    // Método para verificar si el recurso es un PDF
    isPdf(url: string): boolean {
        return url.match(/\.(pdf)$/) !== null;
    }

    applyFilters(): void {
        // Comienza con la lista original

        console.log(this.originalgrupoEvaluacionesList);
        console.log(this.grupoEvaluacionesList);
        
        if (this.filterType === 0) {
            this.grupoEvaluacionesList = [
                ...this.originalgrupoEvaluacionesList,
            ];
            return;
        }
        this.grupoEvaluacionesList = this.originalgrupoEvaluacionesList.filter(
            (examen) => +examen.tipo_evaluacion_id === +this.filterType
        );
    }

    onGlobalFilter2() {
        console.log('cambio');
        
        this.applyFilters()
    }

}