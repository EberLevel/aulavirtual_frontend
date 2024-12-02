import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EvaluacionModalidadService } from 'src/app/components/onlineclasses/service/evaluacion-modalidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-evaluacion-presencial',
  templateUrl: './listado-evaluacion-presencial.component.html',
  styleUrls: ['./listado-evaluacion-presencial.component.scss'],
})
export class ListadoEvaluacionPresencialComponent implements OnInit {
  alumnos: any[] = []; 
  evaluacionId: number = 0;
  tipo_evaluacion_id: number | null = null;
  selectedAlumnos: any[] = []; // Alumnos seleccionados
  isLoading: boolean = true;

  constructor(
    private ref: DynamicDialogRef,
    private evaluacionesService: EvaluacionModalidadService,  
    private config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.evaluacionId = this.config.data.evaluacionId;  
    console.log(this.evaluacionId)
    this.obtenerAlumnos();
    this.obtenerTipoEvaluacion()
  }

  obtenerAlumnos() {
    this.evaluacionesService.obtenerAlumnosPorEvaluacion(this.evaluacionId).subscribe(
      (data) => {
        // Asignar la lista de alumnos a la variable `alumnos`
        this.alumnos = data;
        
        this.tipo_evaluacion_id = data.tipo_evaluacion_id

        this.selectedAlumnos = this.alumnos.filter(alumno => alumno.asistencia === 1);

        this.isLoading = false;
        
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al obtener alumnos:', error);
      }
    );
  }

  obtenerTipoEvaluacion() {
    this.evaluacionesService.obtenerTipoEvaluacion(this.evaluacionId).subscribe(
      (data) => {
        console.log(data);
        this.tipo_evaluacion_id = data.tipo_evaluacion_id;
      },
      (error) => {
        console.error('Error al obtener alumnos:', error);
      }
    );
  }

guardarNotas() {
    const payload = {
      evaluacion_id: this.evaluacionId,
      notas: this.alumnos.map(alumno => ({
        alumno_id: alumno.id,
        nota: alumno.nota,
        asistencia: (alumno.asistencia) ? 1 : 0
      }))
    };

    console.log('Datos a enviar:', payload);

    this.evaluacionesService.guardarNotas(payload).subscribe(
      (response) => {
        this.ref?.close();
        Swal.fire({
          title: 'Éxito',
          text: 'Las notas han sido guardadas correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          showClass: {
            popup: `
              background-color: #78CBF2;
              color: white;
              z-index: 10000!important;
            `
          }
        }).then(() => {

        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al guardar las notas.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          showClass: {
            popup: `
              background-color: #F27474;
              color: white;
              z-index: 10000!important;
            `
          }
        });
        console.error('Error al guardar las notas:', error);
      }
    );
  }
  
  onRowSelect(event: any): void {
    const alumno = event.data;
    alumno.asistencia = 1; // Marcar asistencia como 1
    console.log('Alumno seleccionado:', alumno);
  }
  
  onRowUnselect(event: any): void {
    const alumno = event.data;
    alumno.asistencia = 0; // Marcar asistencia como 0
    console.log('Alumno deseleccionado:', alumno);
  }
  
  onHeaderSelectChange(): void {
    if (this.selectedAlumnos.length === this.alumnos.length) {
      // Todos seleccionados: marcar asistencia como 1
      this.alumnos.forEach(alumno => (alumno.asistencia = 1));
    } else {
      // Ninguno seleccionado: marcar asistencia como 0
      this.alumnos.forEach(alumno => (alumno.asistencia = 0));
    }
    console.log('Estado de asistencia actualizado:', this.alumnos);
  }
  
}
