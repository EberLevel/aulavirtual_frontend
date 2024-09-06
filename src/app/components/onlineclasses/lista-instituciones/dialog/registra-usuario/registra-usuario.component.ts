import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
import { InstitucionService } from '../../../service/institucion.service';

@Component({
    selector: 'app-registra-usuario',
    templateUrl: './registra-usuario.component.html',
    styleUrls: ['./registra-usuario.component.scss'],
})
export class RegistraUsuarioComponent {
    institucionForm: FormGroup;
    acciones: string;
    domain_id!: number;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private institucionService: InstitucionService,
        private helpersService: HelpersService
    ) {
        this.acciones = this.config.data.acciones;

        // Definir las validaciones del formulario
        this.institucionForm = this.fb.group({
            codigo: ['', Validators.required],
            nivel: [''],
            nombre: ['', Validators.required],
            direccion: ['', Validators.required],
            siglas: ['', Validators.required],
            ubigeo: [''],
            telefono: [''],
            domain_id: ['']
        });
    }

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            this.institucionForm.patchValue({
                codigo: this.config.data.data.codigo,
                nombre: this.config.data.data.nombre,
                nivel: this.config.data.data.nivel,
                siglas: this.config.data.data.siglas,
                direccion: this.config.data.data.direccion,
                telefono: this.config.data.data.telefono,
                ubigeo: this.config.data.data.ubigeo,
            });
        }
    }

    guardarInstitucion() {
        if (this.institucionForm.valid) {
            const institucionData = {
                ...this.institucionForm.value,
                domain_id: this.domain_id
            };

            if (this.acciones === 'actualizar') {
                const id = this.config.data.data.id;
                this.institucionService.actualizarInstitucion(id, institucionData).subscribe(
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
                        console.error('Error al actualizar la institución', error);
                    }
                );
            } else {
                this.institucionService.guardarInstitucion(institucionData).subscribe(
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
                        console.error('Error al guardar la institución', error);
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
