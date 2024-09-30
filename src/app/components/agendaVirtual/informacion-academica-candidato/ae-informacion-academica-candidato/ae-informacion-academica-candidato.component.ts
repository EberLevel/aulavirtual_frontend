import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InformacionAcademicaCandidatoService } from 'src/app/components/onlineclasses/service/informacion-academica-candidato.service';
import { InformacionAcademicaService } from 'src/app/components/onlineclasses/service/informacion-academica.service';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ae-informacion-academica-candidato',
    templateUrl: './ae-informacion-academica-candidato.component.html',
    styleUrls: ['./ae-informacion-academica-candidato.component.scss'],
})
export class AeInformacionAcademicaCandidatoComponent {
    informacionAcademicaForm: FormGroup;
    acciones: string;
    estadoOptions: any[] = [
        { label: 'Aprobado', value: 1 },
        { label: 'Desaprobado', value: 2 },
        { label: 'Observado', value: 3 },
        { label: 'En Evaluación', value: 4 },
    ];
    domain_id: any;
    candidato_id: any;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private informacionAcademicaService: InformacionAcademicaCandidatoService,
        private helpersService: HelpersService
    ) {
        this.acciones = this.config.data.acciones;
        this.informacionAcademicaForm = this.fb.group({
            nombre: ['', Validators.required],
            avance: ['', Validators.required],
            estado_id: ['', Validators.required],
            observaciones: [''],
            certificado: [''],
            domain_id: [this.domain_id],
            candidato_id: [this.candidato_id],
        });
    }

    ngOnInit(): void {
        // Obtener los valores de dominio y candidato
        this.domain_id = this.helpersService.getDominioId();
        this.candidato_id = this.helpersService.getCandidatoId();
        console.log('Dominio ID:', this.domain_id); // Verificar si se obtiene correctamente
        console.log('candidato_id ID:', this.candidato_id); // Verificar si se obtiene correctamente

        // Actualizar el formulario con los valores obtenidos
        this.informacionAcademicaForm.patchValue({
            domain_id: this.domain_id,
            candidato_id: this.candidato_id,
        });

        if (this.acciones === 'actualizar' && this.config.data.data) {
            this.informacionAcademicaForm.patchValue(this.config.data.data);
        }
    }

    onFileChange(event: any) {
        const file = event.files[0]; // Captura el archivo seleccionado
    
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const base64String = e.target.result; // Mantén todo el resultado, incluyendo el prefijo
                this.informacionAcademicaForm.patchValue({
                    certificado: base64String, // Almacena la cadena base64 con el prefijo en el formulario
                });
            };
            reader.readAsDataURL(file); // Esto incluye el prefijo 'data:<type>;base64,'
        }
    }
    
    guardarInformacion() {
        if (this.informacionAcademicaForm.valid) {
            const data = this.informacionAcademicaForm.value;
            console.log('Datos enviados al backend:', data); // Verifica los datos aquí

            if (this.acciones === 'actualizar') {
                const id = this.config.data.data.id;
                this.informacionAcademicaService
                    .actualizarInformacionAcademica(id, data)
                    .subscribe(
                        () => {
                            Swal.fire(
                                '¡Éxito!',
                                'La información ha sido actualizada correctamente.',
                                'success'
                            );
                            this.ref.close();
                        },
                        (error) => {
                            Swal.fire(
                                'Error',
                                'Hubo un problema al actualizar la información.',
                                'error'
                            );
                        }
                    );
            } else {
                this.informacionAcademicaService
                    .guardarInformacionAcademica(data)
                    .subscribe(
                        () => {
                            Swal.fire(
                                '¡Éxito!',
                                'La información ha sido guardada correctamente.',
                                'success'
                            );
                            this.ref.close();
                        },
                        (error) => {
                            Swal.fire(
                                'Error',
                                'Hubo un problema al guardar la información.',
                                'error'
                            );
                        }
                    );
            }
        } else {
            console.error('Formulario inválido');
        }
    }

    closeModal() {
        this.ref.close();
    }
}
