import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EvaluacionesService } from 'src/app/components/onlineclasses/service/evaluciones.service';

@Component({
    selector: 'app-reg-evaluacion-docente',
    templateUrl: './reg-evaluacion-docente.component.html',
    styleUrls: ['./reg-evaluacion-docente.component.scss'],
})
export class RegEvaluacionDocenteComponent {
    // Variables del formulario
    nombre!: string;
    tipoEvaluacion!: string;  // Cambiado a string si seleccionamos el "name"
    porcentajeEvaluacion!: number;
    estado!: string;  // Cambiado a string si seleccionamos el "name"
    observaciones!: string;
    grupoDeEvaluacionesId!: number;
    codigo!: string;
    puntos!: number;
    fechaRegistro!: Date | null;
    horaprogramada!: Date | null;
    selectedModalidad!: string;
    horaSeleccionada: string | null = null;

    loading: boolean = false;
    ref: DynamicDialogRef | undefined;

    // Datos de los dropdowns
    tipEvaluacion = [
        { name: 'Oral' },
        { name: 'Escrito' },
        { name: 'Recuperación' },
        { name: 'Trabajo' },
        { name: 'Foro' }
    ];

    estados = [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 }
    ];

    modalidad = [
        { name: 'Virtual' },
        { name: 'Presencial' },
        { name: 'Semi-Presencial' }
    ];

    constructor(
        private evaluacionesService: EvaluacionesService,
        private messageService: MessageService,
        public config: DynamicDialogConfig 
    ) {}
    ngOnInit() {
        // Obtener el ID del grupo de evaluaciones desde el padre
        if (this.config && this.config.data) {
            this.grupoDeEvaluacionesId = this.config.data.idGrupoEvaluaciones;
        }
    }
    capturarHora(event: any): void {
        if (event && event instanceof Date) {
            const horaFormateada: string = event.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
            this.horaSeleccionada = horaFormateada;
            console.log('Hora seleccionada:', this.horaSeleccionada);
        }
    }

    guardarEvaluacion(): void {
        const nuevaEvaluacion = {
            codigo: this.codigo,
            nombre: this.nombre,
            tipo_evaluacion_id: Number(this.tipoEvaluacion),
            porcentaje_evaluacion: Number(this.porcentajeEvaluacion),
            fecha_y_hora_programo: this.fechaRegistro ? this.fechaRegistro.toISOString().slice(0, 10) : null,
            observaciones: this.observaciones,
            estado_id: Number(this.estado),
            puntos: Number(this.puntos),
            grupo_de_evaluaciones_id: Number(this.grupoDeEvaluacionesId),
        };
    
        console.log('Datos enviados:', nuevaEvaluacion);
    
        this.loading = true;
    
        // Llamada al servicio para guardar la evaluación
        this.evaluacionesService.crearEvaluacion(nuevaEvaluacion).subscribe(
            (response) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Evaluación registrada con éxito.',
                });
            },
            (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al registrar la evaluación.',
                });
            }
        );
    }
    

    closeModal() {
        // Cierra el modal
    }
}
