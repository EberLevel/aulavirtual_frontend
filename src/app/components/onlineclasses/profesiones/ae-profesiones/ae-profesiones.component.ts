import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { ProfesionService } from '../../service/profesion.service';

@Component({
  selector: 'app-ae-profesiones',
  templateUrl: './ae-profesiones.component.html',
  styleUrls: ['./ae-profesiones.component.scss']
})
export class AeProfesionesComponent {

  loading: boolean = false;
  profesionForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private profesionService: ProfesionService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.profesionForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    console.log('Dominio ID:', this.domain_id);
    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.profesionForm.patchValue({
        nombre: this.config.data.data.nombre,
      });
    }
  }

  guardarProfesion() {
    if (this.profesionForm.valid) {
        const profesionData = {
          ...this.profesionForm.value,
          domain_id: this.domain_id  // Agregar el domain_id al objeto que se envía
        };

        if (this.acciones === 'actualizar') {
            const id = this.config.data.data.id;  // Extraer el id de la data
            this.profesionService.actualizarProfesion(id, profesionData).subscribe(
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
                    console.error('Error al actualizar la profesión', error);
                }
            );
        } else {
            this.profesionService.guardarProfesion(profesionData).subscribe(
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
                    console.error('Error al guardar la profesión', error);
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