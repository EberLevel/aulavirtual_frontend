import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { Parametro } from '../../../interface/general';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-reg-carrerastecnicas',
    templateUrl: './reg-carrerastecnicas.component.html',
    styleUrls: ['./reg-carrerastecnicas.component.scss'],
})
export class RegCarrerastecnicasComponent implements OnInit {
    loading: boolean = false;
    parametroForm: FormGroup;
    estadosList: any[] = []; // Para los planes de estudio

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private cdr: ChangeDetectorRef,
        public config: DynamicDialogConfig,
        private parametroService: GeneralService,
        private router: Router,
        private helpersService: HelpersService
    ) {
        this.parametroForm = this.fb.group({
            codigo: ['', Validators.required],
            nombres: ['', Validators.required],
            domain_id: [this.helpersService.getDominioId()],
        });
    }

    ngOnInit() {}

    guardarParametro() {
        if (this.parametroForm.valid) {
            console.log('Formulario válido', this.parametroForm.value);
            this.parametroService
                .guardarCarreraTecnica(this.parametroForm.value)
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
                        console.error('Error al guardar el parámetro', error);
                    }
                );
        } else {
            console.error('Formulario inválido');
        }
    }

    closeModal(event: Event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        this.ref?.close();
    }
}
