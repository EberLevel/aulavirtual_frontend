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
    acciones: any;
    domain_id!: number;
    tiempo: string = '';
    idPostulante!: number;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private capacitacionesPostulanteService: CapacitacionesPostulanteService,
        private helpersService: HelpersService,
        private sanitizer: DomSanitizer
    ) {
        this.acciones = this.config.data.acciones;

        // Eliminar el control 'estado' del formulario
        this.capacitacionForm = this.fb.group({
            nombre: ['', Validators.required],
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

        this.cargarDatos();

        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            const data = this.config.data.data;

            const fecha_inicio = new Date(data.fecha_inicio);
            const fecha_termino = new Date(data.fecha_termino);

            this.capacitacionForm.patchValue({
                ...data,
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

    onDateChange(): void {
        this.calcularTiempo();
    }
    cargarDatos() {
        // Puedes eliminar la llamada al servicio si no necesitas cargar más datos
        this.capacitacionesPostulanteService
            .getDataCreate(this.domain_id)
            .subscribe(
                (data) => {
                    console.log('Datos cargados:', data);
                },
                (error) => {
                    console.error('Error al cargar los datos', error);
                }
            );
    }

    guardarCapacitacion() {
        if (this.capacitacionForm.valid) {
            const domain_id = this.helpersService.getDominioId();
    
            const idPostulante = this.config.data.postulanteId
                ? this.config.data.postulanteId
                : this.helpersService.getPostulanteId();
    
            console.log("idPostulante:", idPostulante);
    
            // Verificar si la imagen es un objeto y extraer la cadena base64 si es necesario
            let imagenCertificado = this.capacitacionForm.value.imagen_certificado;
    
            if (imagenCertificado && typeof imagenCertificado === 'object' && imagenCertificado.changingThisBreaksApplicationSecurity) {
                imagenCertificado = imagenCertificado.changingThisBreaksApplicationSecurity; // Extraer la cadena base64
            }
    
            const capacitacion = {
                ...this.capacitacionForm.value,
                fecha_inicio: this.formatDate(this.capacitacionForm.value.fecha_inicio),
                fecha_termino: this.formatDate(this.capacitacionForm.value.fecha_termino),
                domain_id: domain_id,
                id_postulante: idPostulante, // Asignar el postulanteId al guardar
                imagen_certificado: imagenCertificado || '', // Asegurarse de que se envía una cadena o vacía
            };
    
            console.log('Datos enviados al backend:', capacitacion);
    
            if (this.acciones === 'actualizar') {
                const params = {
                    ...capacitacion,
                    id: this.config.data.data.id, // ID del registro para actualizar
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
                            console.error('Error al actualizar el registro', error);
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
