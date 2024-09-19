import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from '../../../service/common.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { HelpersService } from 'src/app/helpers.service';
interface carreras {
    name: string;
    value: number;
    code: string;
}

interface Cantciclos {
    name: string;
    value: number;
    code: string;
}

interface modellistareaformativa {
    name: string;
    value: number;
    code: string;
}

interface modellistadocente {
    name: string;
    value: number;
    code: string;
}

@Component({
    selector: 'app-registra-usuario',
    templateUrl: './registra-usuario.component.html',
    styleUrls: ['./registra-usuario.component.scss'],
})
export class RegistraUsuarioComponent {
    listcarrera!: carreras[];
    seleccarrera: carreras | undefined;

    listciclos!: Cantciclos[];
    selecciclos: Cantciclos | undefined;

    listareaformativa!: modellistareaformativa[];
    selectunidadfromativa: modellistareaformativa | undefined;

    lsitadocente!: modellistadocente[];
    selectdocente: modellistadocente | undefined;

    contsylabus: string = '';

    fechanacimiento!: Date | null;
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        locale: esLocale,
    };

    loading: boolean = false;
    dialogVisible: boolean = false;
    visible: boolean = false;
    userForm: FormGroup;
    isSuperAdmin: boolean = false;
    institutionsList: any[] = [];
    selectedInstitution: any = null;
    dominioId: number = 0;
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private translateService: TranslateService,
        private commonService: CommonService,
        private userServicio: UsuarioService,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private helpersService: HelpersService
    ) {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            dni: ['', Validators.required],
            rolId: ['', Validators.required],
            dominioId: !['', Validators.required] ? this.dominioId : null,
        });
    }

    ngOnInit() {
        if (this.config.data) {
            this.userServicio.getUsuario(this.config.data.idUsuario).subscribe(
                (response: any) => {
                    this.userForm.patchValue({
                        name: response.name,
                        lastname: response.lastname,
                        email: response.email,
                        dni: response.dni,
                        rolId: response.rol_id,
                        dominioId: response.domain_id,
                    });
                },
                (error) => {
                    console.error('Error obteniendo usuario', error);
                }
            );
        }
        this.isSuperAdmin = this.helpersService.isSuperAdmin();
        this.listciclos = [];
        this.dominioId = this.helpersService.getDominioId();
        this.listcarrera = [
            { name: 'DNI', value: 1, code: 'NY' },
            { name: 'PASAPORTE', value: 2, code: 'RM' },
        ];

        this.listareaformativa = [
            { name: 'Área de formación 1', value: 1, code: 'NY' },
            { name: 'Área de formación 2', value: 2, code: 'RM' },
            { name: 'Área de formación 3', value: 2, code: 'RM' },
        ];
        this.lsitadocente = [
            { name: 'Docente 1', value: 1, code: 'NY' },
            { name: 'Docente 2', value: 2, code: 'RM' },
            { name: 'Docente 3', value: 2, code: 'RM' },
        ];

        if (this.translate) {
            this.translateChange('es'); // Cambia a español como ejemplo
        } else {
            console.error('TranslateService is not initialized.');
        }
        this.getRolesDropdown();
        if (this.isSuperAdmin) {
            this.getInstitutionsDropdown();
        }
    }

    cambiarIdioma() {
        this.translateService.use('es');
    }
    getInstitutionsDropdown() {
        this.commonService.getInstitutionsDropdown().subscribe(
            (response: any) => {
                this.institutionsList = response.map((institution: any) => {
                    return {
                        name: institution.name,
                        value: institution.domain_id,
                    };
                });
            },
            (error: any) => {
                console.error('Error obteniendo instituciones', error);
            }
        );
    }
    getRolesDropdown() {
        this.commonService.getRolesDropdown().subscribe(
            (response: any) => {
                this.listciclos = response.map((rol: any) => {
                    return {
                        name: rol.nombre,
                        value: rol.id,
                    };
                });
            },
            (error) => {
                console.error('Error obteniendo carreras', error);
            }
        );
    }
    translateChange(lang: string): void {
        if (this.translate) {
            this.translate.use(lang);
        } else {
            console.error('TranslateService is not initialized.');
        }
    }

    onDropdownChangetipoDni(event: any): void {
        // Lógica para manejar el cambio en el dropdown
        console.log('Dropdown value changed:', event);
    }

    saveUsuario() {
        if (this.userForm.valid) {
            const formData = new FormData();
            formData.append(
                'name',
                this.userForm.get('name')?.value +
                    ' ' +
                    this.userForm.get('lastname')?.value
            );
            formData.append('email', this.userForm.get('email')?.value);
            formData.append('dni', this.userForm.get('dni')?.value);
            formData.append('password', this.userForm.get('password')?.value);
            formData.append('rol_id', this.userForm.get('rolId')?.value);
            formData.append('lastname', this.userForm.get('lastname')?.value);

            // Verificamos si es superadmin para agregar el dominio
            if (this.isSuperAdmin) {
                formData.append(
                    'domain_id',
                    this.userForm.get('dominioId')?.value
                );
            } else {
                formData.append('domain_id', this.dominioId.toString());
            }

            // Verificamos si existe el idUsuario antes de intentar agregarlo
            if (this.config.data && this.config.data.idUsuario) {
                formData.append('id', this.config.data.idUsuario);
            }

            // Mostrar el spinner de carga
            this.spinner.show();
            this.loading = true;

            // Guardar el usuario utilizando el servicio
            this.userServicio.saveUsuario(formData).subscribe(
                (response) => {
                    this.spinner.hide();
                    this.loading = false;
                    this.helpersService.showSuccessMessage(
                        'Usuario registrado correctamente'
                    );
                    this.ref.close({ register: true });
                },
                (error) => {
                    this.spinner.hide();
                    this.loading = false;
                    console.error('Error registrando usuario', error.error);
                    this.helpersService.showErrorMessage(error.error.message);
                }
            );
        }
    }

    closeDialog() {
        this.visible = false;
    }

    closeModal() {
        this.ref.close({ register: false });
    }
}
