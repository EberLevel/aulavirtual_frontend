import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { Parametro } from '../../../interface/general';
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
    parametroForm: FormGroup;
    domain_id!: any;
    estadosList: any[] = [];  // Lista de planes de estudio

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private parametroService: GeneralService,
        private helpersService: HelpersService
    ) {
        this.domain_id = this.helpersService.getDominioId();

        // Configuramos el formulario, incluyendo el plan_de_estudios_id
        this.parametroForm = this.fb.group({
            codigo: [this.config.data.data.codigo, Validators.required],
            nombres: [this.config.data.data.nombres, Validators.required],
            domain_id: [this.domain_id],
            id: [this.config.data.data.id],
            plan_de_estudios_id: [this.config.data.data.plan_de_estudios_id, Validators.required]  // Incluimos el campo del plan de estudios
        });
    }

    ngOnInit() {
        this.listarPlanEstudio();  // Cargar los planes de estudio al iniciar el componente
    }

    listarPlanEstudio(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getEstadoDeCurso().subscribe(
                (response: any) => {
                    console.log('Lista de Planes de Estudio:', response);
                    // Mapeamos los planes de estudio para que sean compatibles con el dropdown
                    this.estadosList = response.map((estado: any) => {
                        return {
                            name: estado.nombre,  // Nombre del plan de estudio
                            value: estado.id      // Valor que se enviará
                        };
                    });
                    resolve();
                },
                (error: any) => reject(error)
            );
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
                        console.error('Error al editar el parámetro', error);
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
