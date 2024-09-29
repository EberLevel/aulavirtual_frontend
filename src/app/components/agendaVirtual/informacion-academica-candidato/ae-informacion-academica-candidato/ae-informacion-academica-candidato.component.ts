import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InformacionAcademicaService } from 'src/app/components/onlineclasses/service/informacion-academica.service';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ae-informacion-academica-candidato',
  templateUrl: './ae-informacion-academica-candidato.component.html',
  styleUrls: ['./ae-informacion-academica-candidato.component.scss']
})
export class AeInformacionAcademicaCandidatoComponent {
  loading: boolean = false;
    informacionAcademicaForm: FormGroup;
    gradosInstruccion: any[] = [];
    profesiones: any[] = [];
    estadoAvances: any[] = [];
    acciones: any;
    domain_id!: number;
    idPostulante!: number;  // Declaramos idPostulante

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private informacionAcademicaService: InformacionAcademicaService,
        private helpersService: HelpersService,
        private messageService: MessageService,
        private sanitizer: DomSanitizer
    ) {
        this.acciones = this.config.data.acciones;

        this.informacionAcademicaForm = this.fb.group({
            grado_instruccion_id: ['', Validators.required],
            profesion_id: ['', Validators.required],
            estado_avance_id: ['', Validators.required],
            institucion: ['', Validators.required],
            fecha_inicio: ['', Validators.required],
            fecha_termino: ['', Validators.required],
            observaciones: [''],
            imagen_certificado: [''],
        });
    }

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();

        // Verificamos si se pasa el idPostulante desde la configuración del modal
        this.idPostulante = this.config.data.postulanteId 
            ? this.config.data.postulanteId 
            : this.helpersService.getPostulanteId();

        if (!this.idPostulante) {
            console.error('No se encontró idPostulante');
            return;
        }

        console.log('ID del postulante en AeInformacionAcademicaComponent:', this.idPostulante);

        this.cargarDatos();

        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            const data = this.config.data.data;

            // Convertir fechas a objetos Date
            const fecha_inicio = new Date(data.fecha_inicio);
            const fecha_termino = new Date(data.fecha_termino);

            // Actualizar el formulario con los datos recibidos
            this.informacionAcademicaForm.patchValue({
                ...data,
                fecha_inicio: fecha_inicio,
                fecha_termino: fecha_termino,
            });
        }
    }

    cargarDatos() {
        this.informacionAcademicaService
            .getDataCreate(this.domain_id)
            .subscribe(
                (data) => {
                    setTimeout(() => {
                        this.gradosInstruccion = data.gradosInstruccion;
                        this.profesiones = data.profesiones;
                        this.estadoAvances = data.estadoAvances;
                    });
                },
                (error) => {
                    console.error('Error al cargar los datos', error);
                }
            );
    }

    guardarInformacionAcademica() {
        if (this.informacionAcademicaForm.valid) {
            const domain_id = this.helpersService.getDominioId();
            const idPostulante = this.config.data.postulanteId 
                ? this.config.data.postulanteId 
                : this.helpersService.getPostulanteId();
    
            // Si la imagen está presente, asegurar que es una cadena base64
            let imagenCertificado = this.informacionAcademicaForm.value.imagen_certificado;
    
            if (imagenCertificado && typeof imagenCertificado === 'object' && imagenCertificado.changingThisBreaksApplicationSecurity) {
                imagenCertificado = imagenCertificado.changingThisBreaksApplicationSecurity;
            }
    
            const informacionAcademica = {
                ...this.informacionAcademicaForm.value,
                fecha_inicio: this.formatDate(this.informacionAcademicaForm.value.fecha_inicio),
                fecha_termino: this.formatDate(this.informacionAcademicaForm.value.fecha_termino),
                domain_id: domain_id,
                id_postulante: idPostulante,
                imagen_certificado: imagenCertificado // Asignar la cadena base64 correctamente
            };
    
            console.log('Datos enviados al backend:', informacionAcademica);
    
            // Manejo de actualización
            if (this.acciones === 'actualizar') {
                const params = {
                    ...informacionAcademica,
                    id: this.config.data.data.id,
                };
                console.log('Datos para actualización:', params);
    
                this.informacionAcademicaService.actualizarInformacionAcademica(params)
                    .subscribe(
                        () => {
                            this.ref?.close();
                            Swal.fire({
                                title: '¡Éxito!',
                                text: 'Los Datos se actualizaron correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            });
                        },
                        (error: any) => {
                            console.error('Error al actualizar el registro', error);
                        }
                    );
            } 
            else {
                console.log('Datos para creación:', informacionAcademica);
                this.informacionAcademicaService.guardarInformacionAcademica(informacionAcademica)
                    .subscribe(
                        () => {
                            this.ref?.close();
                            Swal.fire({
                                title: '¡Éxito!',
                                text: 'Los Datos se registraron correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            });
                        },
                        (error: any) => {
                            console.error('Error al guardar el registro', error);
                        }
                    );
            }
        } else {
            console.error('Formulario inválido');
        }
    }   

    onFileChange(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.informacionAcademicaForm.patchValue({
                imagen_certificado:
                    this.sanitizer.bypassSecurityTrustResourceUrl(
                        e.target.result
                    ),
            });
        };
        reader.readAsDataURL(file);
    }

    formatDate(date: Date): string {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    closeModal(event: Event) {
        event.preventDefault();
        this.ref?.close();
    }
}
