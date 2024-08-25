import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { AnoService } from '../../service/ano.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-ae-afilidado-partido',
  templateUrl: './ae-afilidado-partido.component.html',
  styleUrls: ['./ae-afilidado-partido.component.scss']
})
export class AeAfilidadoPartidoComponent {
  loading: boolean = false;
  anoForm: FormGroup;
  acciones: string;
  domain_id!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private anoService: AnoService,
    private helpersService: HelpersService
  ) {
    this.acciones = this.config.data.acciones;

    this.anoForm = this.fb.group({
      nombre: [{ value: '', disabled: this.acciones === 'ver' }, Validators.required], // Disabled if "ver"
    });
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();

    if (this.acciones === 'ver' || this.acciones === 'actualizar') {
      this.anoForm.patchValue({
        nombre: this.config.data.data.nombre,
      });
    }
  }

  guardarAno() {
    if (this.acciones === 'ver') {
      return; 
    }

    if (this.anoForm.valid) {
      const anoData = {
        ...this.anoForm.value,
        domain_id: this.domain_id,
      };

      if (this.acciones === 'actualizar') {
        const id = this.config.data.data.id;
        this.anoService.actualizarAno(id, anoData).subscribe(() => {
          this.ref?.close();
          Swal.fire('¡Éxito!', 'El año ha sido actualizado correctamente', 'success');
        });
      } else {
        this.anoService.guardarAno(anoData).subscribe(() => {
          this.ref?.close();
          Swal.fire('¡Éxito!', 'El año ha sido creado correctamente', 'success');
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