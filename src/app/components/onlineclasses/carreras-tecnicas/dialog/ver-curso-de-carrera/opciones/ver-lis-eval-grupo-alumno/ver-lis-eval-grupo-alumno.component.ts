import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
    DynamicDialogRef,
    DialogService,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { RegEvaluacionDocenteComponent } from 'src/app/components/onlineclasses/docentes/evaluaciones-docente-menu/dialog/reg-evaluacion-docente/reg-evaluacion-docente.component';
import { Miembro } from 'src/app/components/onlineclasses/interface/general';
import { GeneralService } from 'src/app/components/onlineclasses/service/general.service';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { ListadoEvaluacionPresencialComponent } from '../listado-evaluacion-presencial/listado-evaluacion-presencial.component';
import { VerListadoDePreguntasComponent } from '../ver-listado-de-preguntas/ver-listado-de-preguntas.component';

@Component({
    selector: 'app-ver-lis-eval-grupo-alumno',
    templateUrl: './ver-lis-eval-grupo-alumno.component.html',
    styleUrls: ['./ver-lis-eval-grupo-alumno.component.scss'],
})
export class VerLisEvalGrupoAlumnoComponent {
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
    evaluacion: any;
    filesModalVisible: boolean = false;
    selectedFiles: string[] = [];

    constructor(
        public helpersService: HelpersService,
        private dialogService: DialogService,
        private grupoEvaluacionesService: GeneralService,
        private router: Router,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        console.log("this.config.data",this.config.data)
        const alumnoId = this.config.data.alumnoId;
        const grupoId = this.config.data.data.id;
        console.log('alumnoId , grupoId', alumnoId, grupoId);
        this.grupoEvaluaciones = this.config.data.data || this.config.data;
        this.getNotasPorAlumnoYGrupo(alumnoId, grupoId);
    }

    listarGrupoEvaluaciones() {
        if (this.grupoEvaluaciones && this.grupoEvaluaciones.id) {
            this.grupoEvaluacionesService
                .getGrupoEvaluaciones({ id: this.grupoEvaluaciones.id })
                .subscribe((response: any) => {
                    console.log('Datos de evaluaciones recibidos:', response); // Verificar los datos
                    this.grupoEvaluacionesList = response;
                    this.originalgrupoEvaluacionesList = [...response];
                });
            console.log('ID de grupo para obtener evaluaciones:', this.grupoEvaluaciones.id);
        } else {
            console.error('No se pudo listar las evaluaciones porque el ID de grupo es inválido o no está definido.');
        }
    }
    
    getPromedioPorAlumno(alumnoId: number, grupoId: number): void {
        this.grupoEvaluacionesService.getPromedioPorAlumno(alumnoId, grupoId)
            .subscribe(
                (response: any) => {
                    if (response.success) {
                        this.grupoEvaluacionesList.forEach(grupo => {
                            grupo.promedio_por_alumno = response.promedio;
                        });
                    } else {
                        console.error('Error al obtener el promedio del alumno');
                    }
                },
                (error) => {
                    console.error('Error en la solicitud del promedio:', error);
                }
            );
    }
    
    getNotasPorAlumnoYGrupo(alumnoId: number, grupoId: number): void {
        this.loading = true;
        this.grupoEvaluacionesService
            .getNotasPorAlumnoYGrupo(alumnoId, grupoId)
            .subscribe(
                (response: any) => {
                    console.log('Datos recibidos de la API:', response);
                    if (response.success) {
                        this.grupoEvaluacionesList = response.notas;
                    } else {
                        console.error('Error al obtener las notas');
                    }
                    this.loading = false;
                },
                (error) => {
                    console.error('Error en la solicitud', error);
                    this.loading = false;
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
                (carrera.codigo &&
                    carrera.codigo.toLowerCase().includes(filterValue)) ||
                (carrera.nombres &&
                    carrera.nombres.toLowerCase().includes(filterValue)) ||
                (carrera.cursos &&
                    carrera.cursos.toLowerCase().includes(filterValue))
        );
    }

    // Abre el modal y prepara los archivos
    openFilesModal(carrera: any) {

        console.log(carrera);
        
        this.selectedFiles = this.parseJson(carrera.contenido);
        this.filesModalVisible = true;
    }

    getFileName(fileUrl: string): string {
        return fileUrl.split('/').pop() || 'Archivo';
    }

    parseJson(json: string): string[] {
        try {
            return JSON.parse(json);
        } catch {
            return [];
        }
    }

    // Descarga el archivo
    downloadFile(fileUrl: string) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', this.getFileName(fileUrl));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
