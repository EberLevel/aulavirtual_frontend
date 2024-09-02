import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HelpersService } from 'src/app/helpers.service';
import { FormularioFinalPostulanteService } from '../service/formulario-final-postulante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-final-postulante',
  templateUrl: './formulario-final-postulante.component.html',
  styleUrls: ['./formulario-final-postulante.component.scss']
})
export class FormularioFinalPostulanteComponent implements OnInit {
  formularioFinalForm!: FormGroup;
  estados: any[] = [];
  aceptaciones: any[] = [];
  nivelesCargo: any[] = [];
  puntajes: any[] = [];
  @Input() tablaReferencia: string = ''; 
  @Input() postulanteId!: number; 
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private formularioFinalService: FormularioFinalPostulanteService,
    private helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    // Verifica si el postulanteId se ha pasado como Input, si no, lo obtiene desde HelpersService
    if (!this.postulanteId) {
      this.postulanteId = this.helpersService.getPostulanteId(); // Fallback en caso de que no se reciba como Input
    }

    this.formularioFinalForm = this.fb.group({
      observaciones: [''],
      estado_actual_id: ['', Validators.required],
      aceptacion_id: ['', Validators.required],
      nivel_cargo_final_id: ['', Validators.required],
      puntaje_id: ['', Validators.required],
      institucion: ['']
    });

    this.cargarDatos();
  }

  cargarDatos(): void {
    this.formularioFinalService.getDataCreate().subscribe(data => {
      this.estados = data.estados;
      this.aceptaciones = data.aceptaciones;
      this.nivelesCargo = data.nivelesCargo;
      this.puntajes = data.puntajes;
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al cargar los datos para el formulario.'});
    });
  }

  guardarFormulario(): void {
    if (this.formularioFinalForm.valid) {
        const formularioData = {
            ...this.formularioFinalForm.value,
            tabla_referencia: this.tablaReferencia,  // Establece la tabla de referencia
            postulante_id: this.postulanteId,  // Establece el ID del postulante
        };

        this.formularioFinalService.createFormulario(formularioData).subscribe(
            response => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Formulario guardado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
                // Limpiar el formulario después de guardarlo
                this.formularioFinalForm.reset();
            },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un problema al guardar el formulario'});
            }
        );
    } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Formulario inválido. Por favor, complete los campos requeridos.'});
    }
}


}
