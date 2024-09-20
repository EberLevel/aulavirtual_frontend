import { Component } from '@angular/core';
import {
    DynamicDialogRef,
    DynamicDialogConfig,
    DialogService,
} from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { VerGrupoEvaluacionesComponent } from '../ver-curso-de-carrera/opciones/ver-g-ev/ver-g-ev.component';
import { CursoService } from '../../../service/cursos.service';
import { CrearForoCursoComponent } from '../crear-foro-curso/crear-foro-curso.component';
import { VerGEvAlumnoComponent } from '../ver-curso-de-carrera/opciones/ver-g-ev-alumno/ver-g-ev-alumno.component';

@Component({
    selector: 'app-seleccionar-alumnos-curso',
    templateUrl: './seleccionar-alumnos-curso.component.html',
    styleUrls: ['./seleccionar-alumnos-curso.component.scss'],
})
export class SeleccionarAlumnosCursoComponent {
    loading: boolean = false;
    cursoAlumnoList: any[] = [];
    originalCursoAlumnoList: any[] = [];
    curso: any;
    cursoNombre: string = '';
    domainId: any;
    rolId!: number;
    domain_id!: number;
    constructor(
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public dialogService: DialogService,
        public cursoService: CursoService,
        private alumnoService: GeneralService
    ) {
        this.curso = this.config.data.cursoId;
        this.domainId = this.config.data.domainId;
        this.cursoNombre = this.config.data.cursoNombre;
        this.getAlumnosCurso(this.domainId ?? 1, this.curso);
    }
    getAlumnosCurso(domainId: any, cursoId: any) {
        console.log('domainId', domainId);
        this.loading = true;
        this.alumnoService.getAlumnosCurso(domainId, cursoId).subscribe(
            (data: any[]) => {
                // Asegúrate de recibir un array
                console.log('alumnos', data);
                this.cursoAlumnoList = data; // Asigna el array recibido
                this.originalCursoAlumnoList = [...data]; // Crea una copia
                this.loading = false;
            },
            (error) => {
                console.error('Error al obtener los alumnos', error);
                this.loading = false;
            }
        );
    }

    onSelectAlumno(alumno: any) {
        console.log('alumno cambio seleccionado');
        const data = {
            domain_id: this.domainId ?? 1,
            curso_id: this.curso,
            alumno_id: alumno.id,
            is_participant: alumno.is_participant,
        };
        this.alumnoService.updateAlumnoCurso(data).subscribe((data: any) => {
            this.getAlumnosCurso(this.domainId, this.curso);
        });
    }

    onSelectAll(event: any): void {
        const checked = (event.target as HTMLInputElement).checked;
        this.cursoAlumnoList.forEach((alumn) => {
            alumn.is_participant = checked;
            this.onSelectAlumno(alumn);
        });
    }

    onGlobalFilter(event: Event) {
        const filterValue = (
            event.target as HTMLInputElement
        ).value.toLowerCase();
        console.log('Filtro Global', filterValue);
        if (!filterValue) {
            this.cursoAlumnoList = [...this.originalCursoAlumnoList];
            return;
        }

        this.cursoAlumnoList = this.originalCursoAlumnoList.filter(
            (alumno) =>
                (alumno.codigo &&
                    alumno.codigo.toLowerCase().includes(filterValue)) ||
                (alumno.nombres &&
                    alumno.nombres.toLowerCase().includes(filterValue)) ||
                (alumno.email &&
                    alumno.email.toLowerCase().includes(filterValue))
        );
    }
    cursoData: any = []; // Variable que usará la tabla para mostrar los datos

    getCursoData() {
        this.alumnoService
            .getCursoById(this.curso)
            .subscribe((response: any) => {
                if (response.Exito) {
                    this.cursoData = [response.Datos]; // Extrae los datos de la clave 'Datos'
                } else {
                    console.error('Error al obtener los datos del curso.');
                }
            });
    }

    verEvaluaciones(alumno: any) {
        this.alumnoService
            .getCursoById(this.curso) // Usa el `cursoId` para obtener los detalles
            .subscribe((response: any) => {
                if (response.Exito) {
                    const curso = response.Datos; // Accede a los datos correctos
                    const id = curso.id; // Obtén el ID del curso
                    const alumnoId = alumno.id;

                    this.ref = this.dialogService.open(VerGEvAlumnoComponent, {
                        width: '60%',
                        styleClass: 'custom-dialog-header',
                        data: { id: id , alumnoId: alumnoId }, // Pasa el ID del curso con la clave 'id'
                    });

                    this.ref.onClose.subscribe(() => {
                        this.listarCursos();
                    });
                } else {
                    console.error('Error al obtener los datos del curso.');
                }
            });
    }

    carrerastecnicasList: any[] = [];
    originalCarrerastecnicasList: any[] = [];

    verForos(curso: any) {
        this.ref = this.dialogService.open(CrearForoCursoComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { data: curso },
        });
        this.ref.onClose.subscribe(() => {
            this.listarCursos();
        });
    }
    listarCursos() {
        if (this.rolId === 8) {
            // Si el rolId es 8, usa getCursosPorDomain
            this.cursoService.getCursosPorDomain(this.domain_id).subscribe(
                (response: any) => {
                    this.carrerastecnicasList = response;
                    this.originalCarrerastecnicasList = [...response];
                },
                (error) => {
                    console.error('Error al obtener cursos por dominio', error);
                }
            );
        } else {
            // Si el rolId no es 8, usa getCursosByDocente
            this.alumnoService
                .getCursosByDocente(this.config.data.data.id)
                .subscribe(
                    (response: any) => {
                        this.carrerastecnicasList = response;
                        this.originalCarrerastecnicasList = [...response];
                    },
                    (error) => {
                        console.error(
                            'Error al obtener cursos por docente',
                            error
                        );
                    }
                );
        }
    }
}
