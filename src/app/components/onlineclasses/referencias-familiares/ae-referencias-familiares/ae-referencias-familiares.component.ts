import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ReferenciasFamiliaresService } from '../../service/referencias-familiares.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-ae-referencias-familiares',
    templateUrl: './ae-referencias-familiares.component.html',
    styleUrls: ['./ae-referencias-familiares.component.scss'],
})
export class AeReferenciasFamiliaresComponent {
    referenciaForm: FormGroup;
    acciones: any;
    idPostulante!: number;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private referenciasFamiliaresService: ReferenciasFamiliaresService,
        private helpersService: HelpersService
    ) {
        this.acciones = this.config.data.acciones;

        this.referenciaForm = this.fb.group({
            nombre: ['', Validators.required],
            celular: ['', Validators.required],
            ocupacion: ['', Validators.required],
        });
    }

    ngOnInit(): void {
                // Verificamos si se pasa el idPostulante desde la configuración del modal
                this.idPostulante = this.config.data.postulanteId
                ? this.config.data.postulanteId
                : this.helpersService.getPostulanteId();
    
            if (!this.idPostulante) {
                console.error('No se encontró idPostulante');
                return;
            }

        if (this.acciones === 'actualizar') {
            const data = this.config.data.data;
            this.referenciaForm.patchValue({
                ...data,
            });
        }
    }

    guardarReferencia() {
        if (this.referenciaForm.valid) {
            const domain_id = this.helpersService.getDominioId();
            const idPostulante = this.config.data.postulanteId
            ? this.config.data.postulanteId
            : this.helpersService.getPostulanteId();
            const referencia = {
                ...this.referenciaForm.value,
                domain_id: domain_id,
                id_postulante: idPostulante,
            };
            console.log('Datos enviados al backend:', referencia);
            if (this.acciones === 'actualizar') {
                const params = {
                    ...referencia,
                    id: this.config.data.data.id,
                };
                this.referenciasFamiliaresService
                    .actualizarReferencia(params)
                    .subscribe(
                        () => {
                            this.ref?.close();
                            Swal.fire({
                                title: '¡Éxito!',
                                text: 'Referencia familiar actualizada correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            });
                        },
                        (error: any) => {
                            console.error(
                                'Error al actualizar la referencia familiar',
                                error
                            );
                        }
                    );
            } else {
                this.referenciasFamiliaresService
                    .guardarReferencia(referencia)
                    .subscribe(
                        () => {
                            this.ref?.close();
                            Swal.fire({
                                title: '¡Éxito!',
                                text: 'Referencia familiar creada correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            });
                        },
                        (error: any) => {
                            console.error(
                                'Error al guardar la referencia familiar',
                                error
                            );
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
