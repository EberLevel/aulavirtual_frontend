import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Miembro } from '../../interface/general';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../service/general.service';
import { Router } from '@angular/router';
import { RegCarrerastecnicasComponent } from '../../carreras-tecnicas/dialog/reg-carrerastecnicas/reg-carrerastecnicas.component';
import { RegCursosComponent } from '../dialog/reg-cursos/reg-cursos.component';
import { SeleccionarHorarioCarreraTecnicaComponent } from '../../carreras-tecnicas/dialog/horario-carrera-tecnica/seleccionar-horario-carrera-tecnica.component';
import Swal from 'sweetalert2';
import { SeleccionarAlumnosCursoComponent } from '../../carreras-tecnicas/dialog/seleccionar-alumnos-curso/seleccionar-alumnos-curso.component';
import { MarcarAsistenciaCursoComponent } from '../../carreras-tecnicas/dialog/marcar-asistencia-curso/marcar-asistencia-curso.component';
import { VerGrupoEvaluacionesComponent } from '../../carreras-tecnicas/dialog/ver-curso-de-carrera/opciones/ver-g-ev/ver-g-ev.component';
import { CrearForoCursoComponent } from '../../carreras-tecnicas/dialog/crear-foro-curso/crear-foro-curso.component';
import { VerEvaluacionesComponent } from './ver-evaluaciones/ver-evaluaciones.component';
import { CursoAlumnoService } from '../../service/curso-alumno.service';
import { HelpersService } from 'src/app/helpers.service';
@Component({
  selector: 'app-bandeja-cursos',
  templateUrl: './bandeja-cursos.component.html',
  styleUrls: ['./bandeja-cursos.component.scss']
})
export class BandejaCursosComponent {


  loading: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') tabledt1: Table | undefined;
  @Input() miembro: Miembro[] = [];
  @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

  carrerastecnicasList: any[] = [];
  originalCarrerastecnicasList: any[] = [];

  ref: DynamicDialogRef | undefined;

  // Define the config property
  config: any;
  rolId: any;

  constructor(
    private dialogService: DialogService,
    private cursosService: GeneralService,
    private helpersService: HelpersService,
    private cursoAlumnoService: CursoAlumnoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rolId = this.helpersService.getRolId();
    console.log("ROL ID" , this.rolId)
    
    // Obtener el objeto 'user' del localStorage
    const user = localStorage.getItem('user');

    let alumnoId = null;

    // Verificar si el objeto existe en el localStorage
    if (user) {
        // Parsear el objeto JSON
        const userObj = JSON.parse(user);

        // Acceder a la propiedad docente_id
        alumnoId = userObj.alumno_id || 1;
    } else {
        console.error('No se encontró el objeto user en el localStorage');
    }

    this.config = {
        data: {
            data: {
                id: alumnoId,
                total_creditos: 30
            }
        }
    };

    this.listarCursos();
}

  listarCursos() {
    this.cursoAlumnoService.getCursosByAlumno(this.config.data.data.id).subscribe((response: any) => {
      this.carrerastecnicasList = response;
      this.originalCarrerastecnicasList = [...response];
    });
  }

  navigateToNuevo() {
    this.ref = this.dialogService.open(RegCarrerastecnicasComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header'
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  navigateAddCurso() {
    this.ref = this.dialogService.open(RegCursosComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { id: this.config.data.data.id, total_creditos: this.config.data.data.total_creditos, acciones: 'add' }
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(RegCursosComponent, {
      width: '80%',
      styleClass: 'custom-dialog-header',
      data: { id: this.config.data.data.id, total_creditos: this.config.data.data.total_creditos, acciones: 'ver', data: data }
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(RegCursosComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { id: this.config.data.data.id, total_creditos: this.config.data.data.total_creditos, acciones: 'editar', data: data }
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
        popup: 'custom-swal-popup'
      },
      didOpen: () => {
        const container = document.querySelector('.swal2-container');
        if (container) {
          container.setAttribute('style', 'z-index: 2147483647 !important');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursosService.eliminarCurso(id).subscribe(
          () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'La carrera técnica ha sido eliminada.',
              icon: 'success',
              showClass: {
                popup: `
                  background-color: #78CBF2;
                  color: white;
                  z-index: 10000!important;
                `
              },
              didOpen: () => {
                const container = document.querySelector('.swal2-container');
                if (container) {
                  container.setAttribute('style', 'z-index: 2147483647 !important');
                }
              }
            });
            this.listarCursos();
          },
          () => {
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
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.carrerastecnicasList = [...this.originalCarrerastecnicasList];
      return;
    }

    this.carrerastecnicasList = this.originalCarrerastecnicasList.filter(carrera =>
      (carrera.codigo && carrera.codigo.toLowerCase().includes(filterValue)) ||
      (carrera.nombres && carrera.nombres.toLowerCase().includes(filterValue)) ||
      (carrera.cursos && carrera.cursos.toLowerCase().includes(filterValue))
    );
  }

  verTemas(temas: string) {
    console.log(temas);
  }

  verEvaluaciones(evaluaciones: any) {
    this.ref = this.dialogService.open(VerEvaluacionesComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { data: evaluaciones }
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  verForos(curso: any) {
    this.ref = this.dialogService.open(CrearForoCursoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { data: curso }
    });
    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  verSyllabus(syllabus: string) {
    console.log(syllabus);
  }

  verAlumnos(curso: any) {
    this.ref = this.dialogService.open(SeleccionarAlumnosCursoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { cursoId: curso.id, domainId: curso.domain_id,
        cursoNombre: curso.nombre
       }
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  verHorarios(curso: any) {
    this.ref = this.dialogService.open(SeleccionarHorarioCarreraTecnicaComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { data: curso }
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }

  verAsistencia(curso: any) {
    this.ref = this.dialogService.open(MarcarAsistenciaCursoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { data: curso }
    });

    this.ref.onClose.subscribe(() => {
      this.listarCursos();
    });
  }
}
