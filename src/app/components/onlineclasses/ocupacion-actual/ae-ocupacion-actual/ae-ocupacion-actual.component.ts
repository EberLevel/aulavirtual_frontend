import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { OcupacionActualService } from '../../service/ocupacion-actual.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-ae-ocupacion-actual',
  templateUrl: './ae-ocupacion-actual.component.html',
  styleUrls: ['./ae-ocupacion-actual.component.scss'],
})
export class AeOcupacionActualComponent implements OnInit {
  ocupacionForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private ocupacionActualService: OcupacionActualService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.ocupacionForm = this.fb.group({
      nombre: [{ value: '', disabled: this.acciones === 'ver' }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();

    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.ocupacionForm.patchValue({
        nombre: this.config.data.data.nombre,
      });
    }
  }

  guardarOcupacion() {
    if (this.acciones === 'ver') {
      return; // No guardar si solo está en modo ver
    }

    if (this.ocupacionForm.valid) {
      const ocupacionData = {
        ...this.ocupacionForm.value,
        domain_id: this.domain_id,
      };

      if (this.acciones === 'actualizar') {
        const id = this.config.data.data.id;
        this.ocupacionActualService.actualizarOcupacionActual(id, ocupacionData).subscribe(() => {
          this.ref?.close();
          Swal.fire('¡Éxito!', 'La ocupación ha sido actualizada correctamente', 'success');
        });
      } else {
        this.ocupacionActualService.guardarOcupacionActual(ocupacionData).subscribe(() => {
          this.ref?.close();
          Swal.fire('¡Éxito!', 'La ocupación ha sido creada correctamente', 'success');
        });
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
