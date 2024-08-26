import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GradoInstruccionService } from '../../service/grado-instruccion.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-ae-grado-instruccion',
  templateUrl: './ae-grado-instruccion.component.html',
  styleUrls: ['./ae-grado-instruccion.component.scss']
})
export class AeGradoInstruccionComponent {

  loading: boolean = false;
  parametroForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private gradoInstruccionService: GradoInstruccionService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.parametroForm = this.fb.group({
      nombre: ['', Validators.required],
      nivel: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    console.log('Dominio ID:', this.domain_id);
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.parametroForm.patchValue({
        nombre: this.config.data.data.nombre,
        nivel: this.config.data.data.nivel,
        porcentaje: this.config.data.data.porcentaje
      });
    }
  }

  guardarGradoInstruccion() {
    if (this.parametroForm.valid) {
        const gradoInstruccionData = {
          ...this.parametroForm.value,
          domain_id: this.domain_id  // Agregar el domain_id al objeto que se envía
        };

        if (this.acciones === 'actualizar') {
            // Modo edición
            const id = this.config.data.data.id;  // Extraer el id de la data
            this.gradoInstruccionService.actualizarGradoInstruccion(id, gradoInstruccionData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Los Datos se actualizaron correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                (error: any) => {
                    console.error('Error al actualizar el grado de instrucción', error);
                }
            );
        } else {
            // Modo creación
            this.gradoInstruccionService.guardarGradoInstruccion(gradoInstruccionData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Los Datos se registraron correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                (error: any) => {
                    console.error('Error al guardar el grado de instrucción', error);
                }
            );
        }
    } else {
        console.error('Formulario inválido');
    }
}

  closeModal(event: Event) {
    event.preventDefault();
    this.ref?.close();
  }
}
