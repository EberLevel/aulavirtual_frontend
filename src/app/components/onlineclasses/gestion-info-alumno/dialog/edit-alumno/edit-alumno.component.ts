import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { AlumnoService } from '../../../service/alumno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpersService } from 'src/app/helpers.service';
import { PromocionService } from '../../../service/promocion.service';

interface tipodoc {
    name: string;
    value: number;
    code: string;
}
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
interface Carreras {
    name: string;
    value: number;
}
interface Ciclos {
    name: string;
    value: number;
}

@Component({
    selector: 'app-edit-alumno',
    templateUrl: './edit-alumno.component.html',
    styleUrls: ['./edit-alumno.component.scss'],

    providers: [MessageService],
})
export class EditAlumnoComponent {
    alumnoForm: FormGroup;
    alumno: any;
    tipodocu!: tipodoc[];
    tipoDocumentoSeleccionado: tipodoc | undefined;
    tipoDoc: tipodoc | undefined;
    carreraSeleccionada: Carreras | undefined;
    ciclosSeleccionado: Ciclos | undefined;
    promocionesList: any[] = [];
    carrerasList: Carreras[] = [];
    ciclosList: Ciclos[] = [];
    fechanacimiento: Date | null = new Date();
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        locale: esLocale,
    };
    translateService: any;
    loading: boolean = false;
    domain_id: number = 1;

    constructor(
        private router: Router,
        private ref: DynamicDialogRef,
        private cdr: ChangeDetectorRef,
        public config: DynamicDialogConfig,
        private parametroService: GeneralService,
        private translate: TranslateService,
        private messageService: MessageService,
        private alumnoService: AlumnoService,
        private commonService: CommonService,
        private promocionService: PromocionService,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private helpersService: HelpersService
    ) {
        this.alumnoForm = this.fb.group({
            codigo: ['', Validators.required],
            tipoDocumento: ['', Validators.required],
            numeroDocumento: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            nroCelular: [
                '',
                [Validators.required, Validators.pattern(/^[0-9]{9}$/)],
            ],
            carreraId: ['', Validators.required],
            cicloId: ['', Validators.required],
            direccion: [''],
            fechaNacimiento: [this.fechanacimiento, Validators.required],
            promocionId: ['', Validators.required],
            fotoPerfil: [null as string | null],
            fotoCarnet: [null as string | null],
        });
        this.domain_id = this.helpersService.getDominioId();
    }

    ngOnInit() {
        this.tipodocu = [
            { name: 'DNI', value: 1, code: 'NY' },
            { name: 'PASAPORTE', value: 2, code: 'RM' },
        ];

        if (this.translate) {
            this.translateChange('es');
        } else {
            console.error('TranslateService is not initialized.');
        }

        if (this.config.data) {
            this.alumno = this.config.data.alumno;
            if (this.alumno) {
                this.alumnoForm.patchValue({
                    codigo: this.alumno.codigo,
                    tipoDocumento: 1,
                    numeroDocumento: this.alumno.dni,
                    nombres: this.alumno.nombres,
                    apellidos: this.alumno.apellidos,
                    email: this.alumno.email,
                    nroCelular: this.alumno.celular,
                    carreraId: this.alumno.carrera_id,
                    cicloId: this.alumno.ciclo_id,
                    contraseña: this.alumno.contraseña,
                    promocionId: this.alumno.promocion_id,
                    direccion: this.alumno.direccion,
                    fechaNacimiento: new Date(this.alumno.fecha_nacimiento),
                    fotoPerfil: this.alumno.foto_perfil,
                    fotoCarnet: this.alumno.foto_carnet,
                });
            }
        }

        this.getCarrerasDropdown();
        this.getCiclosDropdown();
        this.getPromocionesDropdown();
    }

    getCarrerasDropdown() {
        this.commonService.getCarrerasDropdown(this.domain_id).subscribe(
            (response) => {
                this.carrerasList = response.map((carrera: any) => {
                    return { name: carrera.nombres, value: carrera.id };
                });
            },
            (error) => console.error('Error obteniendo carreras', error)
        );
    }

    getCiclosDropdown() {
        this.commonService.getCiclosDropdown(this.domain_id).subscribe(
            (response) => {
                this.ciclosList = response.map((ciclo: any) => {
                    return { name: ciclo.nombre, value: ciclo.id };
                });
            },
            (error) => console.error('Error obteniendo ciclos', error)
        );
    }

    getPromocionesDropdown() {
        this.promocionService
            .getPromocionesByDomainId(this.domain_id)
            .subscribe(
                (response) => {
                    this.promocionesList = response.data.map(
                        (promocion: any) => {
                            return {
                                name: promocion.nombre_promocion,
                                value: promocion.id,
                            };
                        }
                    );
                },
                (error) => console.error('Error obteniendo promociones', error)
            );
    }

    actualizarAlumno() {
        if (this.alumnoForm.valid) {
            const alumnoData = {
                codigo: this.alumnoForm.get('codigo')?.value,
                tipoDocumento: this.alumnoForm.get('tipoDocumento')?.value,
                dni: this.alumnoForm.get('numeroDocumento')?.value,
                nombres: this.alumnoForm.get('nombres')?.value,
                apellidos: this.alumnoForm.get('apellidos')?.value,
                email: this.alumnoForm.get('email')?.value,
                nroCelular: this.alumnoForm.get('nroCelular')?.value,
                carreraId: this.alumnoForm.get('carreraId')?.value,
                cicloId: this.alumnoForm.get('cicloId')?.value,
                direccion: this.alumnoForm.get('direccion')?.value,
                fechaNacimiento: this.alumnoForm.get('fechaNacimiento')?.value.toISOString().split('T')[0],
                promocionId: this.alumnoForm.get('promocionId')?.value,
                domain_id: this.domain_id,
                fotoPerfil: this.alumnoForm.get('fotoPerfil')?.value,
                fotoCarnet: this.alumnoForm.get('fotoCarnet')?.value,
                contraseña: this.alumnoForm.get('contraseña')?.value,
            };
    
            console.log('Datos enviados como JSON:', alumnoData);
    
            this.loading = true;
            this.spinner.show();
    
            const id = this.alumno.id;
            const domain_id = this.domain_id;
    
            this.alumnoService.editAlumno(alumnoData, id, domain_id).subscribe(
                (response) => {
                    this.loading = false;
                    this.spinner.hide();
                    this.ref.close({ register: true });
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Alumno actualizado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                },
                (error) => {
                    this.loading = false;
                    this.spinner.hide();
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Hubo un error actualizando al alumno',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            );
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, complete todos los campos obligatorios.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }
    
    translateChange(lang: string): void {
        if (this.translate) {
            this.translate.use(lang);
        } else {
            console.error('TranslateService is not initialized.');
        }
    }

    onUpload(event: any) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Archivo cargado correctamente',
        });
    }
    onPerfilSelect(event: any) {
        const file = event.files[0];
        this.convertImageToBase64(file, (base64Image: string) => {
            this.alumnoForm.patchValue({
                fotoPerfil: base64Image,
            });
        });
    }
    
    onCarnetSelect(event: any) {
        const file = event.files[0];
        this.convertImageToBase64(file, (base64Image: string) => {
            this.alumnoForm.patchValue({
                fotoCarnet: base64Image,
            });
        });
    }
    convertImageToBase64(file: File, callback: (base64Image: string) => void): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            callback(reader.result as string); // Llamar al callback con la imagen en base64
        };
        reader.onerror = (error) => {
            console.error('Error al convertir la imagen a base64:', error);
        };
    }
    

    capturarFecha(event: any) {
        const fecha = new Date(event);
        this.alumnoForm.patchValue({ fechaNacimiento: fecha });
    }

    closeModal() {
        this.ref.close({ register: false });
    }
}
