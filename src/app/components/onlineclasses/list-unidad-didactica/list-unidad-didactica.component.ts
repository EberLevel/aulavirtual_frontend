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
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { CrearForoCursoComponent } from '../carreras-tecnicas/dialog/crear-foro-curso/crear-foro-curso.component';
import { SeleccionarHorarioCarreraTecnicaComponent } from '../carreras-tecnicas/dialog/horario-carrera-tecnica/seleccionar-horario-carrera-tecnica.component';
import { MarcarAsistenciaCursoComponent } from '../carreras-tecnicas/dialog/marcar-asistencia-curso/marcar-asistencia-curso.component';
import { RegCarrerastecnicasComponent } from '../carreras-tecnicas/dialog/reg-carrerastecnicas/reg-carrerastecnicas.component';
import { SeleccionarAlumnosCursoComponent } from '../carreras-tecnicas/dialog/seleccionar-alumnos-curso/seleccionar-alumnos-curso.component';
import { VerGrupoEvaluacionesComponent } from '../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-g-ev/ver-g-ev.component';
import { VerSyllabusComponent } from '../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-syllabus/ver-syllabus.component';
import { VerTemasComponent } from '../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-temas/ver-temas.component';
import { RegCursosComponent } from '../cursos/dialog/reg-cursos/reg-cursos.component';
import { Miembro } from '../interface/general';
import { GeneralService } from '../service/general.service';

@Component({
    selector: 'app-list-unidad-didactica',
    templateUrl: './list-unidad-didactica.component.html',
    styleUrls: ['./list-unidad-didactica.component.scss'],
})
export class ListUnidadDidacticaComponent {
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;
    @Input() miembro: Miembro[] = [];
    @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

    carrerastecnicasList: any[] = []; // Cambia el tipo a any[] para recibir los datos del backend
    originalCarrerastecnicasList: any[] = []; // Add this line to store the original list

    ref: DynamicDialogRef | undefined;
    rolId: any;

    constructor(
        private dialogService: DialogService,
        private cursosService: GeneralService,
        private router: Router,
        public config: DynamicDialogConfig,
        private helpersService: HelpersService
    ) {}

    ngOnInit(): void {
        this.listarTodosLosCursos();
        this.rolId = this.helpersService.getRolId();
        console.log('this.carrerastecnicasList', this.carrerastecnicasList);
    }

    listarTodosLosCursos() {
        this.loading = true; // Activa el indicador de carga

        this.cursosService.getAllCursos().subscribe(
            (response: any[]) => {
                console.log('Todos los cursos obtenidos:', response);

                // Procesa los datos
                this.carrerastecnicasList = response.map((carrera: any) => {
                    const horasTeoricas =
                        parseFloat(carrera.cantidad_de_horas) || 0;
                    const horasPracticas =
                        parseFloat(carrera.horas_practicas) || 0;
                    carrera.totalHoras = horasTeoricas + horasPracticas;

                    return carrera;
                });

                this.originalCarrerastecnicasList = [
                    ...this.carrerastecnicasList,
                ]; // Guarda la lista original
                this.loading = false; // Desactiva el indicador de carga
            },
            (error) => {
                console.error('Error al obtener todos los cursos:', error);
                this.carrerastecnicasList = [];
                this.loading = false;
            }
        );
    }

    navigateToNuevo() {
        console.log('nuevo');

        this.ref = this.dialogService.open(RegCarrerastecnicasComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
        });

        this.ref.onClose.subscribe((data: any) => {
            console.log('Cerrando dialogo');
            this.listarTodosLosCursos(); // Recargar los datos de la tabla
        });
    }

    navigateAddCurso() {    
        this.ref = this.dialogService.open(RegCursosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                acciones: 'add',
            },
        });
    
        this.ref.onClose.subscribe(() => {
            this.listarTodosLosCursos(); // Recargar los datos de la tabla
        });
    }
    


    navigateToEdit(data: any) {
        console.log('Editar', data);
        this.ref = this.dialogService.open(RegCursosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                acciones: 'editar',
                data: data,
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarTodosLosCursos(); // Recargar los datos de la tabla
        });
    }

    navigateToDuplicar(data: any) {
        this.ref = this.dialogService.open(RegCursosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                id: this.config.data.data.id,
                total_creditos: this.config.data.data.total_creditos,
                acciones: 'duplicar',
                data: data,
            },
        });

        this.ref.onClose.subscribe(() => {
            this.listarTodosLosCursos();
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
                // Ejecuta la eliminación en el servicio
                this.cursosService.eliminarCurso(id).subscribe(
                    (response) => {
                        // Muestra el mensaje de éxito
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
                                    document.querySelector('.swal2-container');
                                if (container) {
                                    container.setAttribute(
                                        'style',
                                        'z-index: 2147483647 !important'
                                    );
                                }
                            },
                        }).then(() => {
                            // Recarga la lista de cursos después de eliminar
                            this.listarTodosLosCursos();
                        });
                    },
                    (error) => {
                        // Muestra el mensaje de error si la eliminación falla
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
        console.log('Filtro Global', filterValue);
        if (!filterValue) {
            this.carrerastecnicasList = [...this.originalCarrerastecnicasList];
            return;
        }

        this.carrerastecnicasList = this.originalCarrerastecnicasList.filter(
            (carrera) =>
                (carrera.codigo &&
                    carrera.codigo.toLowerCase().includes(filterValue)) ||
                (carrera.nombres &&
                    carrera.nombres.toLowerCase().includes(filterValue)) ||
                (carrera.cursos &&
                    carrera.cursos.toLowerCase().includes(filterValue))
        );
    }

    verSyllabus(idCurso: number) {
        this.ref = this.dialogService.open(VerSyllabusComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { cursoId: idCurso },
        });
    }

    verTemas(idCurso: number) {
        this.ref = this.dialogService.open(VerTemasComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { cursoId: idCurso },
        });
    }

    verAlumnos(curso: any) {
        this.ref = this.dialogService.open(SeleccionarAlumnosCursoComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: {
                cursoId: curso.id,
                domainId: curso.domain_id,
                cursoNombre: curso.nombre,
            },
        });
    }

    verHorarios(curso: any) {
        this.ref = this.dialogService.open(
            SeleccionarHorarioCarreraTecnicaComponent,
            {
                width: '80%',
                styleClass: 'custom-dialog-header',
                data: { data: curso },
            }
        );
        this.ref.onClose.subscribe((data: any) => {
            // Puedes manejar cualquier acción después de cerrar el modal aquí si es necesario
            console.log('Dialog cerrado', data);
        });
    }

    verAsistencia(curso: any) {
        this.ref = this.dialogService.open(MarcarAsistenciaCursoComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: {
                cursoId: curso.id,
                domainId: curso.domain_id,
                fecha: null,
                cursoNombre: curso.nombre,
                docenteId: curso.docente_id, // Aquí pasas el docente_id
            },
        });
    }

    verEvaluaciones(evaluaciones: any) {
        console.log('evaluaciones', evaluaciones);
        this.ref = this.dialogService.open(VerGrupoEvaluacionesComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { data: evaluaciones },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarTodosLosCursos(); // Recargar los datos de la tabla
        });
    }

    verForos(curso: any) {
        this.ref = this.dialogService.open(CrearForoCursoComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { data: curso },
        });
        this.ref.onClose.subscribe((data: any) => {
            this.listarTodosLosCursos(); // Recargar los datos de la tabla
        });
    }
}
