import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EvaluacionesService } from 'src/app/components/onlineclasses/service/evaluciones.service';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-reg-evaluacion-docente',
    templateUrl: './reg-evaluacion-docente.component.html',
    styleUrls: ['./reg-evaluacion-docente.component.scss'],
})
export class RegEvaluacionDocenteComponent {
    // Variables del formulario
    nombre!: string;
    tipoEvaluacion!: string;
    estado!: string;
    observaciones!: string;
    textoEnrriquesido!: string;
    grupoDeEvaluacionesId!: number;
    fechaRegistro!: Date | null;
    horaprogramada!: Date | null;  // Aseguramos que esta es del tipo Date
    porcentajeAsignado!: number;
    acciones!: string;  // Aquí almacenamos la acción ('registrar' o 'actualizar')
    modalidad: any;
    loading: boolean = false;
    recursosModal: boolean = false;
    selectedFiles: any[] = []
    evaluacion_id: any = null
    isFileUploadVisible: boolean = false;
    existingFiles: any[] = []

    // Datos de los dropdowns
    tipEvaluacion = [
        { name: 'Evaluacion', value: 80 },
        { name: 'Tema', value: 81 }
    ];

    estados = [
        { name: 'Pendiente', value: 1 },
        { name: 'En Proceso', value: 2 },
        { name: 'Culminado', value: 3 }
    ];
    tipModalidad = [
        { name: 'Presencial', value: 0 },
        { name: 'Remoto', value: 1 }
    ];
    domain_id: any;

    constructor(
        public ref: DynamicDialogRef,
        private evaluacionesService: EvaluacionesService,
        private messageService: MessageService,
        public config: DynamicDialogConfig,
        private helpersService: HelpersService
    ) { }

    ngOnInit() {
        this.domain_id = this.helpersService.getDominioId();
        console.log(this.domain_id)
        if (this.config && this.config.data) {
            this.acciones = this.config.data.acciones;

            if (this.acciones === 'registrar') {
                this.grupoDeEvaluacionesId = this.config.data.idGrupoEvaluaciones;
            }

            if (this.acciones === 'actualizar') {
                const idEvaluacion = this.config.data.idEvaluacion;
                this.evaluacion_id = this.config.data.idEvaluacion;
                this.cargarDatosParaEditar(idEvaluacion);
            }
        }
    }

    capturarHora(event: any): void {
        if (event && event instanceof Date) {
            const horaFormateada: string = event.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
            console.log('Hora seleccionada:', horaFormateada);
            this.horaprogramada = event;  // Guardamos la hora como Date en horaprogramada
        }
    }

    cargarDatosParaEditar(idEvaluacion: number) {
        this.evaluacionesService.obtenerEvaluacionPorId(idEvaluacion).subscribe(
            (response) => {
                console.log('Datos obtenidos del backend:', response);
                const evaluacion = response;
                this.nombre = evaluacion.nombre;
                this.tipoEvaluacion = evaluacion.tipo_evaluacion_id;
                this.estado = evaluacion.estado_id;
                this.observaciones = evaluacion.observaciones;
                this.fechaRegistro = new Date(evaluacion.fecha_y_hora_programo);
                this.grupoDeEvaluacionesId = evaluacion.grupo_de_evaluaciones_id;
                this.modalidad = evaluacion.modalidad;
                this.porcentajeAsignado = evaluacion.porcentaje_asignado;

                this.existingFiles = JSON.parse(evaluacion.contenido);

                console.log(this.existingFiles);
                

                // Extraer y establecer la hora como Date en horaprogramada
                const fechaCompleta = new Date(evaluacion.fecha_y_hora_programo);
                const soloHora = new Date();  // Usamos la fecha actual y sobreescribimos solo la hora
                soloHora.setHours(fechaCompleta.getHours());
                soloHora.setMinutes(fechaCompleta.getMinutes());
                soloHora.setSeconds(0); // Ajustamos los segundos a cero

                this.horaprogramada = soloHora;  // Asignamos la hora extraída al p-calendar
            },
            (error) => {
                console.error('Error al obtener la evaluación:', error);
            }
        );
    }

    guardarEvaluacion(event: any): void {
        // Combinar la fecha y la hora
        let fechaHoraProgramada = null;
        if (this.fechaRegistro && this.horaprogramada) {
            const fechaString = this.fechaRegistro.toISOString().slice(0, 10); // Obtener fecha en formato YYYY-MM-DD
            const horaString = this.horaprogramada.toTimeString().slice(0, 8); // Obtener solo la hora en formato HH:MM:SS
            fechaHoraProgramada = `${fechaString} ${horaString}`; // Combinar fecha y hora
        }

        const nuevaEvaluacion = {
            nombre: this.nombre,
            tipo_evaluacion_id: Number(this.tipoEvaluacion),
            fecha_y_hora_programo: fechaHoraProgramada,  // Aquí se asigna la fecha con la hora
            observaciones: this.observaciones || null,
            textoEnrriquesido: this.textoEnrriquesido || null,
            estado_id: Number(this.estado),
            modalidad: this.modalidad,
            domain_id: this.domain_id,
            grupo_de_evaluaciones_id: this.grupoDeEvaluacionesId || null,
            porcentaje_asignado: this.porcentajeAsignado || 0
        };

        console.log('Datos enviados:', nuevaEvaluacion);
        this.loading = true;

        console.log('Archivos subidos:', event.files);
        console.log(this.selectedFiles);

        // this.selectedFiles.push(...event.files); // Guarda los archivos subidos

        this.evaluacionesService.crearEvaluacion(nuevaEvaluacion, this.selectedFiles).subscribe(
            (response) => {
                this.loading = false;
                Swal.fire({
                    title: 'Registrado',
                    text: 'La evaluación ha sido registrada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    showClass: {
                        popup: `
                            background-color: #78CBF2;
                            color: white;
                            z-index: 10000!important;
                        `
                    },
                    didOpen: () => {
                        const container = document.querySelector('.swal2-container');
                        if (container) {
                            container.setAttribute('style', 'z-index: 2147483647 !important');
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        if (this.ref) {
                            this.ref.close();
                        }
                    }
                });
            },
            (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al registrar la evaluación. Por favor intenta de nuevo.',
                });
            }
        );
    }

    actualizarEvaluacion(): void {
        let fechaHoraProgramada = null;
        if (this.fechaRegistro && this.horaprogramada) {
            const fechaString = this.fechaRegistro.toISOString().slice(0, 10);
            const horaString = this.horaprogramada.toTimeString().slice(0, 8);
            fechaHoraProgramada = `${fechaString} ${horaString}`;
        }

        const evaluacionActualizada = {
            nombre: this.nombre,
            tipo_evaluacion_id: Number(this.tipoEvaluacion),
            fecha_y_hora_programo: fechaHoraProgramada,
            observaciones: this.observaciones || null,
            modalidad: this.modalidad,
            estado_id: Number(this.estado),
            domain_id: this.domain_id,
            grupo_de_evaluaciones_id: this.grupoDeEvaluacionesId || null,
            porcentaje_asignado: this.porcentajeAsignado || 0
        };

        console.log('Datos enviados para actualizar:', evaluacionActualizada);

        this.evaluacionesService.actualizarEvaluacion(this.config.data.idEvaluacion, evaluacionActualizada).subscribe(
            (response) => {
                Swal.fire({
                    title: 'Actualizado',
                    text: 'La evaluación ha sido actualizada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
                this.ref.close();
            },
            (error) => {
                console.error('Error al actualizar la evaluación:', error);
            }
        );
    }

    closeModal() {
        this.ref.close({ register: false });
    }

    showModalRecursos() {
        this.recursosModal = true;  // Cambiar a true para mostrar el modal
    }

    // Función opcional para cerrar el modal
    closeModalRecursos() {
        this.recursosModal = false; // Cambiar a false para ocultar el modal
    }

    onFileSelect(event: any) {
        // this.selectedFiles = event.files;  // Guardar los archivos seleccionados
        this.selectedFiles.push(...Array.from(event.files));
        console.log(this.selectedFiles);
    }

    onSelectFiles() {
        this.isFileUploadVisible = !this.isFileUploadVisible;  // Alternar visibilidad
        console.log(this.selectedFiles);

    }

    removeFile(file: any) {
        console.log(file + 'removed!');

    }
}
