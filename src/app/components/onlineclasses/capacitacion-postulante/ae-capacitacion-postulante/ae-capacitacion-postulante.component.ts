import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { CapacitacionesPostulanteService } from '../../service/capacitaciones-postulante.service';
import { HelpersService } from 'src/app/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-ae-capacitacion-postulante',
    templateUrl: './ae-capacitacion-postulante.component.html',
    styleUrls: ['./ae-capacitacion-postulante.component.scss'],
})
export class AeCapacitacionPostulanteComponent {
    loading: boolean = false;
    capacitacionForm: FormGroup;
    estados: any[] = [];
    acciones: any;
    domain_id!: number;
    tiempo: string = '';

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private capacitacionesPostulanteService: CapacitacionesPostulanteService,
        private helpersService: HelpersService,
        private sanitizer: DomSanitizer
    ) {
        this.acciones = this.config.data.acciones;

        this.capacitacionForm = this.fb.group({
            nombre: ['', Validators.required],
            estado: ['', Validators.required],
            institucion: ['', Validators.required],
            fecha_inicio: ['', Validators.required],
            fecha_termino: ['', Validators.required],
            observaciones: [''],
            imagen_certificado: [''],
        });
    }

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        this.cargarDatos();

        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            const data = this.config.data.data;
            
            console.log('Datos recibidos en el modal:', data);
            const fecha_inicio = new Date(data.fecha_inicio);
            const fecha_termino = new Date(data.fecha_termino);

            this.capacitacionForm.patchValue({
                ...data,
                estado: data.estado_ano ? data.estado_ano.id : null,
                fecha_inicio: fecha_inicio,
                fecha_termino: fecha_termino,
            });
        }
        this.calcularTiempo();
    }
    calcularTiempo(): void {
        const fechaInicio = this.capacitacionForm.get('fecha_inicio')?.value;
        const fechaTermino = this.capacitacionForm.get('fecha_termino')?.value;

        if (fechaInicio && fechaTermino) {
            const diffInMs =
                new Date(fechaTermino).getTime() -
                new Date(fechaInicio).getTime();
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            const years = Math.floor(diffInDays / 365);
            const months = Math.floor((diffInDays % 365) / 30);

            this.tiempo = `${years} años, ${months} meses`;
        } else {
            this.tiempo = '';
        }
    }

    // Método que se ejecuta al cambiar la fecha de inicio o término
    onDateChange(): void {
        this.calcularTiempo();
    }
    cargarDatos() {
        this.capacitacionesPostulanteService.getDataCreate(this.domain_id).subscribe(
            (data) => {
                this.estados = data.estados;
            },
            (error) => {
                console.error('Error al cargar los datos', error);
            }
        );
    }

    guardarCapacitacion() {
        if (this.capacitacionForm.valid) {
            const domain_id = this.helpersService.getDominioId();
            const idPostulante = this.helpersService.getPostulanteId();
            const capacitacion = {
                ...this.capacitacionForm.value,
                fecha_inicio: this.formatDate(
                    this.capacitacionForm.value.fecha_inicio
                ),
                fecha_termino: this.formatDate(
                    this.capacitacionForm.value.fecha_termino
                ),
                domain_id: domain_id,
                id_postulante: idPostulante,
            };
            console.log(capacitacion);
            if (capacitacion.imagen_certificado) {
                capacitacion.imagen_certificado =
                    capacitacion.imagen_certificado
                        .changingThisBreaksApplicationSecurity ||
                    capacitacion.imagen_certificado;
            }

            if (this.acciones === 'actualizar') {
                const params = {
                    ...capacitacion,
                    id: this.config.data.data.id,
                };
                this.capacitacionesPostulanteService
                    .actualizarCapacitacion(params)
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
                            console.error(
                                'Error al actualizar el registro',
                                error
                            );
                        }
                    );
            } else {
                this.capacitacionesPostulanteService
                    .guardarCapacitacion(capacitacion)
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
                            console.error(
                                'Error al guardar el registro',
                                error
                            );
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
            this.capacitacionForm.patchValue({
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
