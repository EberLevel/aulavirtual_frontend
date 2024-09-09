import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { Miembro, Parametro } from '../../../interface/general';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { Router } from '@angular/router';
import { RegCarrerastecnicasComponent } from '../../dialog/reg-carrerastecnicas/reg-carrerastecnicas.component';
import { RegCursosComponent } from '../../../cursos/dialog/reg-cursos/reg-cursos.component';
import { EditarCarreraTecnicaComponent } from '../../dialog/editar-carrera-tecnica/editar-carrera-tecnica.component';
import { VerCarreraTecnicaComponent } from '../../dialog/ver-carrera-tecnica/ver-carrera-tecnica.component';
import { SeleccionarHorarioCarreraTecnicaComponent } from '../../dialog/horario-carrera-tecnica/seleccionar-horario-carrera-tecnica.component';
import Swal from 'sweetalert2';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SeleccionarAlumnosCursoComponent } from '../seleccionar-alumnos-curso/seleccionar-alumnos-curso.component';
import { MarcarAsistenciaCursoComponent } from '../marcar-asistencia-curso/marcar-asistencia-curso.component';
import { VerGrupoEvaluacionesComponent } from './opciones/ver-g-ev/ver-g-ev.component';
import { CrearForoCursoComponent } from '../crear-foro-curso/crear-foro-curso.component';
import { VerSyllabusComponent } from './opciones/ver-syllabus/ver-syllabus.component';
import { VerTemasComponent } from './opciones/ver-temas/ver-temas.component';
@Component({
    selector: 'app-ver-curso-de-carrera',
    templateUrl: './ver-curso-de-carrera.component.html',
    styleUrls: ['./ver-curso-de-carrera.component.scss'],
})
export class VerCursoDeCarreraComponent {
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;
    @Input() miembro: Miembro[] = [];
    @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

    carrerastecnicasList: any[] = []; // Cambia el tipo a any[] para recibir los datos del backend
    originalCarrerastecnicasList: any[] = []; // Add this line to store the original list

    ref: DynamicDialogRef | undefined;

    constructor(
        private dialogService: DialogService,
        private cursosService: GeneralService,
        private router: Router,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.listarCursos();
    }

    listarCursos() {
        this.cursosService
            .getCursos(this.config.data.data.id)
            .subscribe((response: any) => {
                this.carrerastecnicasList = response;
                console.log('cursos', this.carrerastecnicasList);
                this.originalCarrerastecnicasList = [...response];
            });
    }

    navigateToNuevo() {
        console.log('nuevo');

        this.ref = this.dialogService.open(RegCarrerastecnicasComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
        });

        this.ref.onClose.subscribe((data: any) => {
            console.log('Cerrando dialogo');
            this.listarCursos(); // Recargar los datos de la tabla
        });
    }

    navigateAddCurso() {
        console.log("first")
        console.log(this.config.data.data.id,)
        this.ref = this.dialogService.open(RegCursosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                id: this.config.data.data.id,
                total_creditos: this.config.data.data.total_creditos,
                acciones: 'add',
            },
        
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarCursos(); // Recargar los datos de la tabla
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(RegCursosComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: {
                id: this.config.data.data.id,
                total_creditos: this.config.data.data.total_creditos,
                acciones: 'ver',
                data: data,
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarCursos();
        });
    }

    navigateToEdit(data: any) {
        console.log('Editar', data);
        this.ref = this.dialogService.open(RegCursosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: {
                id: this.config.data.data.id,
                total_creditos: this.config.data.data.total_creditos,
                acciones: 'editar',
                data: data,
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.listarCursos(); // Recargar los datos de la tabla
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
            this.listarCursos();
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
                this.cursosService.eliminarCurso(id).subscribe(
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
                                    document.querySelector('.swal2-container');
                                if (container) {
                                    container.setAttribute(
                                        'style',
                                        'z-index: 2147483647 !important'
                                    );
                                }
                            },
                        });
                        // Aquí puedes actualizar la vista, por ejemplo, recargar la lista de carreras técnicas
                    },
                    (error) => {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al eliminar la carrera técnica.',
                            'error'
                        );
                    }
                );
                this.listarCursos(); // Recargar los datos de la tabla
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
          docenteId: curso.docente_id // Aquí pasas el docente_id
        }
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
            this.listarCursos(); // Recargar los datos de la tabla
        });
    }

    verForos(curso: any) {
        this.ref = this.dialogService.open(CrearForoCursoComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { data: curso },
        });
        this.ref.onClose.subscribe((data: any) => {
            this.listarCursos(); // Recargar los datos de la tabla
        });
    }
}
