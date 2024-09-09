import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
    DynamicDialogRef,
    DialogService,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { PreguntaAlumnoService } from '../../../service/pregunta-alumno.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-corregir-preguntas',
    templateUrl: './corregir-preguntas.component.html',
    styleUrls: ['./corregir-preguntas.component.scss'],
})
export class CorregirPreguntasComponent implements OnInit {
    loading: boolean = false;
    preguntasPorCorregirList: any[] = [];
    correccionForm: FormGroup; // Form group para los controles de corrección
    ref: DynamicDialogRef | undefined;

    constructor(
        private dialogService: DialogService,
        private preguntaAlumnoService: PreguntaAlumnoService,
        private fb: FormBuilder, // Para crear el form
        public config: DynamicDialogConfig // Inyectar el config
    ) {
        this.correccionForm = this.fb.group({});
    }

    ngOnInit(): void {
        const evaluacionId = this.config.data.data.id;
        console.log('evaluacionId', evaluacionId);
        this.listarPreguntasParaCorregir(evaluacionId);
    }

    listarPreguntasParaCorregir(evaluacionId: number) {
      this.loading = true;
      this.preguntaAlumnoService.getListadoDePreguntasPorCorregir(evaluacionId).subscribe((response: any) => {
          console.log('Respuesta de la API:', response);  
  
          this.preguntasPorCorregirList = response;
  
          this.preguntasPorCorregirList.forEach((pregunta, index) => {
              console.log('Pregunta recibida:', pregunta);  
              const controlName = 'correccion_' + index;
              this.correccionForm.addControl(controlName, new FormControl(''));
          });
  
          this.loading = false;
      }, error => {
          this.loading = false;
          console.error("Error al cargar las preguntas por corregir:", error);
      });
  }
  
     // Guardar la corrección seleccionada para cada pregunta
    guardarCorreccion(pregunta: any, index: number) {
      const controlName = 'correccion_' + index;
      const estadoSeleccionado = this.correccionForm.get(controlName)?.value;
  
      if (!estadoSeleccionado) {
          Swal.fire(
              'Error',
              'Debes seleccionar una opción antes de guardar.',
              'error'
          );
          return;
      }
  
      // Imprimir el objeto `pregunta` para ver su contenido
      console.log('Pregunta:', pregunta);
  
      // Asume que `pregunta` contiene los campos `pregunta_id` y `alumno_id`
      const preguntaId =  this.config.data.data.id;
      const alumnoId = pregunta.alumno_id;
  
      if (!preguntaId || !alumnoId) {
          console.error('Faltan los IDs de la pregunta o el alumno');
          return;
      }
  
      const estadoId = estadoSeleccionado === 'correcto' ? 1 : 0;
  
      // Llamar al servicio para actualizar el estado_id
      this.preguntaAlumnoService
          .actualizarEstadoPregunta({ pregunta_id: preguntaId, alumno_id: alumnoId, estado_id: estadoId })
          .subscribe(
              (response) => {
                  Swal.fire(
                      'Éxito',
                      'La corrección ha sido guardada correctamente.',
                      'success'
                  );
              },
              (error) => {
                  console.error('Error al guardar la corrección:', error);
                  Swal.fire(
                      'Error',
                      'Ocurrió un error al guardar la corrección.',
                      'error'
                  );
              }
          );
  }
  
  

    guardarTodasLasCorrecciones() {
        this.preguntasPorCorregirList.forEach((pregunta, index) => {
            this.guardarCorreccion(pregunta, index);
        });
    }
}
