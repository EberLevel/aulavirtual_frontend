import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ExperienciaLaboralService } from '../../service/experiencia-laboral.service';
import { HelpersService } from 'src/app/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-ae-experiencia-laboral',
    templateUrl: './ae-experiencia-laboral.component.html',
    styleUrls: ['./ae-experiencia-laboral.component.scss'],
})
export class AeExperienciaLaboralComponent {
    loading: boolean = false;
    experienciaForm: FormGroup;
    vinculosLaborales: any[] = [];
    modalidadesPuesto: any[] = [];
    acciones: any;
    domain_id!: number;
    idPostulante!: number;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private experienciaLaboralService: ExperienciaLaboralService,
        private helpersService: HelpersService,
        private sanitizer: DomSanitizer
    ) {
        this.acciones = this.config.data.acciones;

        this.experienciaForm = this.fb.group({
            tipo_institucion: ['', Validators.required],
            puesto: ['', Validators.required],
            institucion: ['', Validators.required],
            area: [''],
            remuneracion_mensual: ['', Validators.required],
            fecha_ingreso: ['', Validators.required],
            fecha_termino: [''],
            tiempo_experiencia_especifica: [''],
            tiempo_experiencia_general: [''],
            dias_cuenta_regresiva: [''],
            funciones: [''],
            motivo_termino: [''],
            observaciones: [''],
            vinculo_laboral_id: ['', Validators.required],
            modalidad_puesto_id: ['', Validators.required],
            imagen: [''],
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

        this.cargarDatos();

        // Usar el servicio para obtener los vínculos laborales y modalidades de puesto
        this.experienciaLaboralService.getDataCreate(this.domain_id).subscribe(
            (data) => {
                // Llenar los dropdowns con los datos recibidos
                this.vinculosLaborales = data.vinculos;
                this.modalidadesPuesto = data.modalidades;
            },
            (error) => {
                console.error('Error al cargar los datos', error);
            }
        );

        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            const data = this.config.data.data;
            const fecha_ingreso = new Date(data.fecha_ingreso);
            const fecha_termino = new Date(data.fecha_termino);

            this.experienciaForm.patchValue({
                ...data,
                vinculo_laboral_id: data.vinculo_laboral
                    ? data.vinculo_laboral.id
                    : null,
                modalidad_puesto_id: data.modalidad_puesto
                    ? data.modalidad_puesto.id
                    : null,
                fecha_ingreso: fecha_ingreso,
                fecha_termino: fecha_termino,
            });
        }
    }
    
    

    cargarDatos() {
        this.experienciaLaboralService.getDataCreate(this.domain_id).subscribe(
            (data) => {
                this.vinculosLaborales = data.vinculosLaborales;
                this.modalidadesPuesto = data.modalidadesPuesto;
            },
            (error) => {
                console.error('Error al cargar los datos', error);
            }
        );
    }

    guardarExperiencia() {
        if (this.experienciaForm.valid) {
            const domain_id = this.helpersService.getDominioId();
            const idPostulante = this.config.data.postulanteId
                ? this.config.data.postulanteId
                : this.helpersService.getPostulanteId();
    
            console.log("idPostulante:", idPostulante);
    
            // Verificar si la imagen es un objeto y extraer la cadena base64 si es necesario
            let imagen = this.experienciaForm.value.imagen;
    
            if (imagen && typeof imagen === 'object' && imagen.changingThisBreaksApplicationSecurity) {
                imagen = imagen.changingThisBreaksApplicationSecurity; // Extraer la cadena base64
            }
    
            const experiencia = {
                ...this.experienciaForm.value,
                fecha_ingreso: this.formatDate(this.experienciaForm.value.fecha_ingreso),
                fecha_termino: this.experienciaForm.value.fecha_termino
                    ? this.formatDate(this.experienciaForm.value.fecha_termino)
                    : null,
                domain_id: domain_id,
                id_postulante: idPostulante,
                imagen: imagen || '' // Enviar la cadena base64 o vacía si no hay imagen
            };
    
            console.log('Datos enviados al backend:', experiencia);
    
            if (this.acciones === 'actualizar') {
                const params = {
                    ...experiencia,
                    id: this.config.data.data.id,
                };
                this.experienciaLaboralService
                    .actualizarExperiencia(params)
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
            } else {
                this.experienciaLaboralService
                    .guardarExperiencia(experiencia)
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
            this.experienciaForm.patchValue({
                imagen: e.target.result // Esto es la cadena base64
            });
        };
        reader.readAsDataURL(file);
    }
    
    onDateChange(): void {
        // Aquí puedes realizar alguna acción cuando se selecciona una fecha
        console.log('Fecha cambiada:', this.experienciaForm.value.fecha_ingreso, this.experienciaForm.value.fecha_termino);
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
