import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { ModalidadPuestoService } from '../../service/modalidad-puesto.service';

@Component({
  selector: 'app-ae-modalidad-puesto',
  templateUrl: './ae-modalidad-puesto.component.html',
  styleUrls: ['./ae-modalidad-puesto.component.scss']
})
export class AeModalidadPuestoComponent {

  loading: boolean = false;
  parametroForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private modalidadPuestoService: ModalidadPuestoService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.parametroForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.parametroForm.patchValue({
        nombre: this.config.data.data.nombre
      });
    }
  }

  guardarModalidadPuesto() {
    if (this.parametroForm.valid) {
      const modalidadPuestoData = {
        ...this.parametroForm.value,
        domain_id: this.domain_id  // Agregar el domain_id al objeto que se envía
      };

      if (this.acciones === 'actualizar') {
        const id = this.config.data.data.id;
        this.modalidadPuestoService.actualizarModalidadPuesto(id, modalidadPuestoData).subscribe(
          (response: any) => {
            this.ref?.close();
            Swal.fire({
              title: '¡Éxito!',
              text: 'La modalidad de puesto se actualizó correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          (error: any) => {
            console.error('Error al actualizar la modalidad de puesto', error);
          }
        );
      } else {
        this.modalidadPuestoService.guardarModalidadPuesto(modalidadPuestoData).subscribe(
          (response: any) => {
            this.ref?.close();
            Swal.fire({
              title: '¡Éxito!',
              text: 'La modalidad de puesto se creó correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          (error: any) => {
            console.error('Error al crear la modalidad de puesto', error);
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
