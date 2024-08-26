import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { NivelPuestoService } from '../../service/nivel-puesto.service';

@Component({
  selector: 'app-ae-nivel-puesto',
  templateUrl: './ae-nivel-puesto.component.html',
  styleUrls: ['./ae-nivel-puesto.component.scss']
})
export class AeNivelPuestoComponent {

  loading: boolean = false;
  parametroForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private nivelPuestoService: NivelPuestoService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    // Ya no se incluye el campo porcentaje
    this.parametroForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    console.log('Dominio ID:', this.domain_id);
    
    // Solo llenamos el formulario si estamos en modo "ver" o "actualizar"
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.parametroForm.patchValue({
        nombre: this.config.data.data.nombre
      });
    }
  }

  guardarNivelPuesto() {
    if (this.parametroForm.valid) {
        const nivelPuestoData = {
          ...this.parametroForm.value,
          domain_id: this.domain_id  // Agregar el domain_id al objeto que se envía
        };

        if (this.acciones === 'actualizar') {
            // Modo edición
            const id = this.config.data.data.id;  // Extraer el id de la data
            this.nivelPuestoService.actualizarNivelCargo(id, nivelPuestoData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'El nivel de puesto se actualizó correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                (error: any) => {
                    console.error('Error al actualizar el nivel de puesto', error);
                }
            );
        } else {
            // Modo creación
            this.nivelPuestoService.guardarNivelCargo(nivelPuestoData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'El nivel de puesto se creó correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                (error: any) => {
                    console.error('Error al crear el nivel de puesto', error);
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
