import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VinculoLaboralService } from '../../service/vinculo-laboral.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-ae-vinculos-laborales',
  templateUrl: './ae-vinculos-laborales.component.html',
  styleUrls: ['./ae-vinculos-laborales.component.scss']
})
export class AeVinculosLaboralesComponent {
  vinculoForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private vinculoLaboralService: VinculoLaboralService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.vinculoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();  // Obtiene el domain_id
    console.log('Dominio ID:', this.domain_id);
    
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.vinculoForm.patchValue({
        nombre: this.config.data.data.nombre
      });
    }
  }

  guardarVinculoLaboral() {
    if (this.vinculoForm.valid) {
        const vinculoLaboralData = {
          ...this.vinculoForm.value,
          domain_id: this.domain_id  // Agregar el domain_id al objeto que se envía
        };

        if (this.acciones === 'actualizar') {
            // Modo edición
            const id = this.config.data.data.id;
            this.vinculoLaboralService.actualizarVinculoLaboral(id, vinculoLaboralData).subscribe(
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
                    console.error('Error al actualizar el vínculo laboral', error);
                }
            );
        } else {
            // Modo creación
            this.vinculoLaboralService.guardarVinculoLaboral(vinculoLaboralData).subscribe(
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
                    console.error('Error al guardar el vínculo laboral', error);
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