import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { EstadoAvanceService } from '../../service/estado-avance.service';

@Component({
  selector: 'app-ae-estado-avance',
  templateUrl: './ae-estado-avance.component.html',
  styleUrls: ['./ae-estado-avance.component.scss']
})
export class AeEstadoAvanceComponent {

  loading: boolean = false;
  estadoForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private estadoAvanceService: EstadoAvanceService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.estadoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    console.log('Dominio ID:', this.domain_id);
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.estadoForm.patchValue({
        nombre: this.config.data.data.nombre,
      });
    }
  }

  guardarEstadoAvance() {
    if (this.estadoForm.valid) {
        const estadoAvanceData = {
          ...this.estadoForm.value,
          domain_id: this.domain_id  // Agregar el domain_id al objeto que se envía
        };

        if (this.acciones === 'actualizar') {
            const id = this.config.data.data.id;  // Extraer el id de la data
            this.estadoAvanceService.actualizarEstadoAvance(id, estadoAvanceData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Estado de avance actualizado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                (error: any) => {
                    console.error('Error al actualizar el estado de avance', error);
                }
            );
        } else {
            this.estadoAvanceService.guardarEstadoAvance(estadoAvanceData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Estado de avance creado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                (error: any) => {
                    console.error('Error al guardar el estado de avance', error);
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
