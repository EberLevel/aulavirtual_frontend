import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { BandejaAvanceCurricularComponent } from '../../avance-curricular/bandeja-avance-curricular/bandeja-avance-curricular.component';

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
    estadoAlumnoOptions: { label: string, value: string }[] = [
        { label: 'EN PROCESO', value: 'EN PROCESO' },
        { label: 'RETIRADO', value: 'RETIRADO' }
    ];
    showModalPagos: boolean = false
    pagoAlumnosList: any[] = []
    pagosPendientes: any[] = []
    uploadForm!: FormGroup; // Formulario para subir el comprobante
    voucherBase64: string = ''; // Aquí se almacenará la imagen en Base64

    constructor(
        private router: Router,
        private ref: DynamicDialogRef,
        private cdr: ChangeDetectorRef,
        public config: DynamicDialogConfig,
        private parametroService: GeneralService,
        private dialogService: DialogService,
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
            promocionId: ['', Validators.required],
            estadoId: ['', Validators.required],
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
            fotoPerfil: [null as string | null],
            fotoCarnet: [null as string | null],
            estadoAlumno: ['', Validators.required],
            contraseña: ['', Validators.required]
        });
        this.domain_id = this.helpersService.getDominioId();

        this.uploadForm = this.fb.group({
            pago_id: ['', Validators.required]
          });
    }

    ngOnInit() {
        this.listarPlanEstudio();

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
                    estadoId: this.alumno.estado_id,
                    contraseña: this.alumno.contraseña,
                    promocionId: this.alumno.promocion_id,
                    direccion: this.alumno.direccion,
                    fechaNacimiento: new Date(this.alumno.fecha_nacimiento),
                    fotoPerfil: this.alumno.foto_perfil,
                    fotoCarnet: this.alumno.foto_carnet,
                    estadoAlumno: this.alumno.estadoAlumno || 'EN PROCESO'
                });
            }
        }
        this.getCiclosDropdown();
        this.getPromocionesDropdown();
        this.listarPagoDeAlumno();
        this.cargarSelectPagos();
    }

    estadosList: { name: string, value: number }[] = [];

    listarPlanEstudio(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getEstadoDeCurso().subscribe(
                (response: any) => {
                    this.estadosList = response.map((estado: any) => {
                        return {
                            name: estado.nombre,
                            value: estado.id
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

    navigateToAvanceCurricular(alumno: any) {
        const id = this.alumno.id;
        console.log("ALUMNO", id)

        const data = {
            domain_id: alumno.domain_id ?? 1,
            id: this.alumno.id,
        };

        console.log("data", data)


        this.alumnoService.showAlumno(data).subscribe(
            (response: any) => {
                this.ref = this.dialogService.open(BandejaAvanceCurricularComponent, {
                    data: {
                        alumno: response,
                    },
                    width: '60%',
                    styleClass: 'custom-dialog-header',
                });

                // Cuando el modal se cierra
                this.ref.onClose.subscribe((result: any) => {
                    if (result) {
                        // Maneja los datos que se devuelven al cerrar el diálogo
                        console.log('Datos recibidos al cerrar el diálogo:', result);
                    }
                });
            },
            (error: any) => {
                console.error('Error al obtener los datos del alumno:', error);
            }
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
                estadoId: this.alumnoForm.get('estadoId')?.value,
                direccion: this.alumnoForm.get('direccion')?.value,
                fechaNacimiento: this.alumnoForm.get('fechaNacimiento')?.value.toISOString().split('T')[0],
                promocion_id: this.alumnoForm.get('promocionId')?.value,
                domain_id: this.domain_id,
                fotoPerfil: this.alumnoForm.get('fotoPerfil')?.value,
                fotoCarnet: this.alumnoForm.get('fotoCarnet')?.value,
                contraseña: this.alumnoForm.get('contraseña')?.value,
                estadoAlumno: this.alumnoForm.get('estadoAlumno')?.value
            };

            console.log('Datos enviados como JSON:', alumnoData);

            this.loading = true;
            this.spinner.show();

            const id = this.alumno.id;
            console.log("ALUMNO", id)

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

    openModalPagos() {
        this.showModalPagos = true;
    }

    listarPagoDeAlumno() {
        this.alumnoService.listarPagoDeAlumno(this.alumno.id, this.domain_id).subscribe(
            (response: any) => {
                const pagos = response
                this.pagoAlumnosList = pagos["pagos"]
                console.log('pago alumnos ', pagos["pagos"]);
                console.log(this.pagoAlumnosList);
                this.cargarSelectPagos()
            })
    }

    cargarSelectPagos() {
        // Filtrar pagos con estado pendiente (estado_id === 1)
        console.log(this.pagoAlumnosList);
        
        this.pagosPendientes = this.pagoAlumnosList.filter((pago: any) => pago.estado_id === 1);
        console.log('Pagos pendientes:', this.pagosPendientes);
    }

    // Manejar la selección del archivo y convertirlo a Base64
onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.voucherBase64 = file; // Convertir el archivo a Base64
        console.log('line 423');
        
        console.log(this.voucherBase64);
    }
  }

  // Subir el comprobante
  onSubmit() {

    console.log(this.voucherBase64);
    
    if (this.uploadForm.valid && this.voucherBase64) {

        const formData = new FormData();
        formData.append('pago_id', this.uploadForm.get('pago_id')?.value);
        formData.append('voucher_pago', this.voucherBase64); // Agregar el archivo seleccionado
        formData.append('alumno_id', this.alumno.id.toString()); // Añadir otros datos necesarios
        formData.append('domain_id', this.domain_id.toString());

      this.alumnoService.subirComprobante(formData).subscribe(
        (response) => {
        
          this.uploadForm.reset(); // Reiniciar formulario
          this.voucherBase64 = ''; // Limpiar imagen
          this.listarPagoDeAlumno(); // Recargar pagos pendientes
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'El pago se subio correctamente!',
            life: 3000,
            });
        },
        (error) => {
          console.error('Error al subir comprobante:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Error al subir el pago',
            life: 3000,
            });
        }
      );
    } else {
      alert('Por favor, completa todos los campos antes de enviar.');
    }
  }
}
