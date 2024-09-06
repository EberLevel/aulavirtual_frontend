import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { Parametro } from '../../../interface/general';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
@Component({
    selector: 'app-editar-carrera-tecnica',
    templateUrl: './editar-carrera-tecnica.component.html',
    styleUrls: ['./editar-carrera-tecnica.component.scss'],
})
export class EditarCarreraTecnicaComponent {
    loading: boolean = false;
    parametroDatos: Parametro = new Parametro();
    parametro: Parametro = new Parametro();
    mostrarCursos = false;
    parametroForm: FormGroup;
    domain_id!: any;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private parametroService: GeneralService,
        private helpersService: HelpersService
    ) {
        this.domain_id = this.helpersService.getDominioId();

        this.parametroForm = this.fb.group({
            codigo: [this.config.data.data.codigo, Validators.required],
            nombres: [this.config.data.data.nombres, Validators.required],
            domain_id: this.domain_id,
            id: this.config.data.data.id,
        });
    }

    editarParametro() {
        if (this.parametroForm.valid) {
            console.log('Formulario válido', this.parametroForm.value);
            this.parametroService
                .editarCarreraTecnica(this.parametroForm.value)
                .subscribe(
                    (response: any) => {
                        this.ref?.close();
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Los Datos se registraron correctamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        }).then(() => {});
                    },
                    (error: any) => {
                        console.error('Error al editar el parametro', error);
                        // Aquí puedes manejar el error, como mostrar un mensaje de error
                    }
                );
        } else {
            console.error('Formulario inválido');
            // Aquí puedes manejar el caso de formulario inválido, como mostrar un mensaje de error
        }
    }

    closeModal(event: Event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        this.ref?.close();
    }
}
