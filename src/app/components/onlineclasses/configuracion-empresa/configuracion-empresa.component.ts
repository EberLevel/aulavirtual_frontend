import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HorarioService } from 'src/app/components/onlineclasses/service/horario.service';
import { AulaService } from 'src/app/components/onlineclasses/service/aula.service';
import { HelpersService } from 'src/app/helpers.service';
import { GeneralService } from '../service/general.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-configuracion-empresa',
    templateUrl: './configuracion-empresa.component.html',
    styleUrls: ['./configuracion-empresa.component.scss'],
})
export class ConfiguracionEmpresaComponent {
    nombreInstitucion: string = '';
    logoActual: string | ArrayBuffer | null = null;
    logoFile: File | null = null;
    domain_id: number = 0;
    loading: boolean = false;
    constructor(
        private generalService: GeneralService,
        private helpersService: HelpersService,
        private spinner: NgxSpinnerService
    ) {
        this.domain_id = this.helpersService.getDominioId();
    }
    ngOnInit() {
        // ... (código existente)
        this.getCompany();
    }
    getCompany() {
        this.spinner.show();
        this.loading = true;
        this.generalService.getCompany(this.domain_id).subscribe(
            (response: any) => {
                this.nombreInstitucion = response.data.name;
                this.logoActual = response.data.logo_url;
                this.loading = false;
                this.spinner.hide();
            },
            (error: any) => {
                this.helpersService.showErrorMessage(
                    'Error al obtener la institución'
                );
                this.loading = false;
                this.spinner.hide();
            }
        );
    }

    saveCompany() {
        const formData = new FormData();
        formData.append('nombreInstitucion', this.nombreInstitucion);
        formData.append('domain_id', this.domain_id.toString());
        if (this.logoFile) {
            formData.append('logo', this.logoFile);
        }

        this.spinner.show();
        this.loading = true;

        this.generalService.saveCompany(formData).subscribe(
            (response: any) => {
                this.helpersService.showSuccessMessage(
                    'Institución actualizada correctamente'
                );

                window.location.reload();

                this.loading = false;
                this.spinner.hide();
            },
            (error: any) => {
                this.helpersService.showErrorMessage(
                    'Error al actualizar la institución'
                );
                this.loading = false;
                this.spinner.hide();
            }
        );
    }

    onLogoSelect(event: any) {
        this.logoFile = event.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.logoActual = e.target.result;
        };
        if (this.logoFile) {
            reader.readAsDataURL(this.logoFile);
        }
    }

    actualizarLogo() {
        this.logoActual = null;
        this.logoFile = null;
    }
}
