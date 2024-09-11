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
    selector: 'app-reg-alumno',
    templateUrl: './reg-alumno.component.html',
    styleUrls: ['./reg-alumno.component.scss'],

    providers: [MessageService],
})
export class RegAlumnoComponent {
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
    estados: any[] = [];
    estado: any = {};

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
            estadoId: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contraseña: ['', Validators.required],
            nroCelular: [
                '',
                [Validators.required, Validators.pattern(/^[0-9]{9}$/)],
            ],
            carreraId: ['', Validators.required],
            cicloId: ['', Validators.required],
            // edad: ['', [Validators.required, Validators.min(1)]],
            direccion: [''],
            fechaNacimiento: [this.fechanacimiento, Validators.required],
            promocionId: ['', Validators.required],
            fotoPerfil: [null as string | null],
            fotoCarnet: [null as string | null],
        });
    }
    onGlobalFilter(table: Table, event: any) {
        table.filterGlobal(event.target.value, 'contains');
    }

    ngOnInit() {
        this.domain_id = this.helpersService.getDominioId();
        this.listarPlanEstudio();

        // Detectar cuando se selecciona un plan de estudios
        this.alumnoForm
            .get('estadoId')
            ?.valueChanges.subscribe((selectedEstadoId) => {
                if (selectedEstadoId) {
                    this.getCarrerasDropdown(selectedEstadoId); // Pasar el ID del plan de estudios para filtrar las carreras
                }
            });

        this.tipodocu = [
            { name: 'DNI', value: 1, code: 'NY' },
            { name: 'PASAPORTE', value: 2, code: 'RM' },
        ];
        if (this.translate) {
            this.translateChange('es'); // Cambia a español como ejemplo
        } else {
            console.error('TranslateService is not initialized.');
        }

        if (this.config.data) {
            this.alumno = this.config.data.alumno;
            console.log('first');
            console.log(this.alumno);
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
        this.getCiclosDropdown();
        this.getPromocionesDropdown();
    }

    estadosList: { name: string; value: number }[] = [];

    listarPlanEstudio(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getEstadoDeCurso().subscribe(
                (response: any) => {
                    console.log('Lista de listarPlanEstudio', response);
                    // Mapear los datos obtenidos para que el dropdown los entienda
                    this.estadosList = response.map((estado: any) => {
                        return {
                            name: estado.nombre,
                            value: estado.id,
                        };
                    });
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }
    getCarrerasDropdown(planDeEstudioId: number) {
        // Llamar a la API para obtener las carreras filtradas por el Plan de Estudio seleccionado
        this.commonService.getCarrerasDropdownByPlanDeEstudio(planDeEstudioId).subscribe(
            (response) => {
                this.carrerasList = response.map((carrera: any) => {
                    return {
                        name: carrera.nombres,
                        value: carrera.id,
                    };
                });
            },
            (error) => {
                console.error('Error obteniendo carreras', error);
            }
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
                (error) => {
                    console.error('Error obteniendo promociones', error);
                }
            );
    }
    getAge(dateString: string) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    onCarnetSelect(event: any) {
        const file = event.files[0];
        this.alumnoForm.patchValue({
            fotoCarnet: file,
        });
    }
    onPerfilSelect(event: any) {
        const file = event.files[0];
        this.alumnoForm.patchValue({
            fotoPerfil: file,
        });
    }
    getCiclosDropdown() {
        this.commonService.getCiclosDropdown(this.domain_id).subscribe(
            (response) => {
                this.ciclosList = response.map((ciclo: any) => {
                    return {
                        name: ciclo.nombre,
                        value: ciclo.id,
                    };
                });
            },
            (error) => {
                console.error('Error obteniendo ciclos', error);
            }
        );
    }
    cambiarIdioma() {
        this.translateService.use('es');
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
    actualizarAlumno() {
        if (this.alumnoForm.valid) {
            // Crear un objeto JSON normal en lugar de FormData
            const alumnoData = {
                codigo: this.alumnoForm.get('codigo')?.value,
                tipoDocumento: this.alumnoForm.get('tipoDocumento')?.value,
                numeroDocumento: this.alumnoForm.get('numeroDocumento')?.value,
                nombres: this.alumnoForm.get('nombres')?.value,
                apellidos: this.alumnoForm.get('apellidos')?.value,
                email: this.alumnoForm.get('email')?.value,
                nroCelular: this.alumnoForm.get('nroCelular')?.value,
                carreraId: this.alumnoForm.get('carreraId')?.value,
                estadoId: this.alumnoForm.get('estadoId')?.value,
                cicloId: this.alumnoForm.get('cicloId')?.value,
                contraseña: this.alumnoForm.get('contraseña')?.value,
                direccion: this.alumnoForm.get('direccion')?.value,
                fechaNacimiento: this.alumnoForm
                    .get('fechaNacimiento')
                    ?.value.toISOString()
                    .split('T')[0],
                promocion_id: this.alumnoForm.get('promocionId')?.value,
            };

            console.log('Datos enviados como JSON:', alumnoData); // Para depuración

            this.loading = true;
            this.spinner.show();

            const id = this.alumno.id; // Asegúrate de que el ID del alumno esté disponible
            const domain_id = this.domain_id; // Asegúrate de que el domain_id esté disponible

            // Llamar al servicio con los datos en formato JSON
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
        }
    }
    saveAlumno() {
        if (this.alumnoForm.valid) {
            const alumnoData: {
                codigo: string;
                tipoDocumento: string;
                numeroDocumento: string;
                nombres: string;
                apellidos: string;
                nroCelular: string;
                carreraId: number;
                estadoId: number;
                contraseña: string;
                cicloId: number;
                promocion_id: number;
                email: string;
                direccion: string;
                fechaNacimiento: string;
                fotoPerfil: string | null;
                fotoCarnet: string | null;
                domain_id: number;
            } = {
                codigo: this.alumnoForm.get('codigo')?.value,
                tipoDocumento: this.alumnoForm.get('tipoDocumento')?.value,
                numeroDocumento: this.alumnoForm.get('numeroDocumento')?.value,
                nombres: this.alumnoForm.get('nombres')?.value,
                apellidos: this.alumnoForm.get('apellidos')?.value,
                nroCelular: this.alumnoForm.get('nroCelular')?.value,
                carreraId: this.alumnoForm.get('carreraId')?.value,
                estadoId: this.alumnoForm.get('estadoId')?.value,
                cicloId: this.alumnoForm.get('cicloId')?.value,
                promocion_id: this.alumnoForm.get('promocionId')?.value,
                contraseña: this.alumnoForm.get('contraseña')?.value,
                email: this.alumnoForm.get('email')?.value,
                direccion: this.alumnoForm.get('direccion')?.value,
                fechaNacimiento: this.alumnoForm
                    .get('fechaNacimiento')
                    ?.value.toISOString()
                    .split('T')[0],
                fotoPerfil: null,
                fotoCarnet: null,
                domain_id: this.domain_id,
            };
            console.log('Datos enviados:', alumnoData);
            let fotoPerfilLista = false;
            let fotoCarnetLista = false;

            // Función para registrar solo cuando ambas imágenes estén listas
            const intentarRegistrar = () => {
                if (fotoPerfilLista && fotoCarnetLista) {
                    this.registrarAlumno(alumnoData);
                }
            };

            // Convertir imágenes seleccionadas a base64 si existen
            if (this.alumnoForm.get('fotoPerfil')?.value) {
                this.convertImageToBase64(
                    this.alumnoForm.get('fotoPerfil')?.value,
                    (base64Image: string) => {
                        alumnoData.fotoPerfil = base64Image;
                        fotoPerfilLista = true;
                        intentarRegistrar();
                    }
                );
            } else {
                fotoPerfilLista = true;
                intentarRegistrar();
            }

            if (this.alumnoForm.get('fotoCarnet')?.value) {
                this.convertImageToBase64(
                    this.alumnoForm.get('fotoCarnet')?.value,
                    (base64Image: string) => {
                        alumnoData.fotoCarnet = base64Image;
                        fotoCarnetLista = true;
                        intentarRegistrar();
                    }
                );
            } else {
                fotoCarnetLista = true; // Si no hay imagen, marcamos como lista
                intentarRegistrar();
            }
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, complete todos los campos obligatorios.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }
    convertImageToBase64(
        file: File,
        callback: (base64Image: string) => void
    ): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            callback(reader.result as string); // Llamar a la función de callback con la imagen base64
        };
        reader.onerror = (error) => {
            console.error('Error al convertir imagen a base64:', error);
        };
    }
    registrarAlumno(alumnoData: any) {
        this.loading = true;
        this.spinner.show();
        console.log('Datos enviados:', alumnoData);
        this.alumnoService.saveAlumno(alumnoData).subscribe(
            (response) => {
                this.loading = false;
                this.spinner.hide();
                this.ref.close({ register: true });
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Alumno registrado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            },
            (error) => {
                this.loading = false;
                this.spinner.hide();
                this.helpersService.showErrorMessage(error.error.message);
            }
        );
    }
    capturarFecha(event: any) {
        console.log('Fecha', event);
        let fecha: Date = new Date(event);
        let fechaString = '';
        if (fecha instanceof Date) {
            fechaString = fecha.toISOString().split('T')[0];
        }

        this.alumnoForm.patchValue({
            fechaNacimiento: fecha,
        });
    }
    closeModal() {
        this.ref.close({ register: false });
    }
}
