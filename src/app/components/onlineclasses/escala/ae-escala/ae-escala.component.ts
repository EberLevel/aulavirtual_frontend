import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { EscalaService } from '../../service/escala.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-ae-escala',
  templateUrl: './ae-escala.component.html',
  styleUrls: ['./ae-escala.component.scss']
})
export class AeEscalaComponent implements OnInit {
  escalaForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private escalaService: EscalaService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    // Definir las validaciones del formulario
    this.escalaForm = this.fb.group({
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      c: [''],  // Este campo es opcional
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.escalaForm.patchValue({
        nombre: this.config.data.data.nombre,
        color: this.config.data.data.color,
        c: this.config.data.data.c
      });
    }
  }

  // Manejar el cambio de color
  onColorChange(event: any) {
    const color = event.target.value;
    this.escalaForm.get('color')?.setValue(color);
  }

  guardarEscala() {
    if (this.escalaForm.valid) {
      const escalaData = {
        ...this.escalaForm.value,
        domain_id: this.domain_id
      };

      if (this.acciones === 'actualizar') {
        const id = this.config.data.data.id;
        this.escalaService.actualizarEscala(id, escalaData).subscribe(
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
            console.error('Error al actualizar la escala', error);
          }
        );
      } else {
        this.escalaService.guardarEscala(escalaData).subscribe(
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
            console.error('Error al guardar la escala', error);
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
