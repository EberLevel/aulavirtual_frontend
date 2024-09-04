import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AsistenciaService } from '../../../service/asistencia.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-marcar-asistencia-curso',
    templateUrl: './marcar-asistencia-curso.component.html',
    styleUrls: ['./marcar-asistencia-curso.component.scss'],
})
export class MarcarAsistenciaCursoComponent {
    loading: boolean = false;
    asistenciaCursoList: any[] = [];
    curso: any;
    domainId: any;
    docente_id: any;
    aulaId: any;
    cursoNombre: any;
    fechas: string[] = [];
    selectedFecha: string = '';
    initialLoad: boolean = true;

    constructor(
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private asistenciaService: AsistenciaService,
        private helpersService: HelpersService
    ) {
        this.curso = this.config.data.cursoId;
        this.domainId = this.helpersService.getDominioId();
        this.docente_id = this.config.data.docenteId;
        this.cursoNombre = this.config.data.cursoNombre;
        this.fechas = [];

        console.log("DATA")
        console.log(this.curso)
        console.log(this.domainId)
        console.log(this.docente_id)


        // Llamar al método para obtener las fechas del curso horario
        this.cargarFechasCursoHorario();
    }

    // Método para cargar las fechas del curso horario
    cargarFechasCursoHorario() {
        this.asistenciaService
            .getFechasCursoHorario(
                this.curso,
                this.docente_id,
                this.domainId
            )
            .subscribe(
                (response) => {
                    this.fechas = this.generarRangoFechas(response);
                    if (this.fechas.length > 0) {
                        this.selectedFecha = this.fechas[0]; // Seleccionar la primera fecha por defecto
                        this.getAsistenciaCurso(
                            this.domainId,
                            this.curso,
                            this.selectedFecha,
                            true
                        ); // Cargar la asistencia para la primera fecha
                    }
                },
                (error) => {
                    console.error(
                        'Error al obtener las fechas del curso horario:',
                        error
                    );
                }
            );
    }
    // Método para generar un rango de fechas entre fecha_inicio y fecha_fin
    generarRangoFechas(fechas: any): string[] {
        const fechasGeneradas: string[] = [];
        fechas.forEach((fecha: any) => {
            const fechaInicio = new Date(fecha.fecha_inicio);
            const fechaFin = new Date(fecha.fecha_fin);

            let currentDate = fechaInicio;
            while (currentDate <= fechaFin) {
                fechasGeneradas.push(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
                currentDate.setDate(currentDate.getDate() + 1); // Avanza un día
            }
        });
        return fechasGeneradas;
    }

    // Obtener asistencia del curso para una fecha específica
    getAsistenciaCurso(
        domainId: any,
        cursoId: any,
        fecha: any,
        isInitialLoad: boolean = false
    ) {
        console.log('Enviando solicitud al backend con la fecha:', fecha); // Verificar si la fecha se envía correctamente

        this.loading = true;
        const data = {
            domain_id: domainId,
            curso_id: cursoId,
            fecha: fecha,
        };

        this.asistenciaService.getAsistenciaCurso(data).subscribe(
            (data: any) => {
                console.log('Respuesta de la API:', data);

                if (data.horarios && data.horarios.length > 0) {
                    const fechaInicio = new Date(data.horarios[0].fecha_inicio);
                    const fechaFin = new Date(data.horarios[0].fecha_fin);
                    const classDays: any[] = [];
                    data.horarios.forEach((element: any) => {
                        if (!classDays.includes(element.day_id)) {
                            classDays.push(element.day_id);
                        }
                    });

                    if (isInitialLoad && this.fechas.length > 0) {
                        this.selectedFecha = this.fechas[0]; // Establece la primera fecha disponible como seleccionada por defecto
                        this.getAsistenciaCurso(
                            domainId,
                            cursoId,
                            this.selectedFecha
                        ); // Llama de nuevo a la API con la fecha seleccionada
                    } else {
                        this.loading = false;
                        this.asistenciaCursoList = data.participantes;
                    }
                } else {
                    console.error('No se encontraron horarios para el curso.');
                    this.loading = false;
                }
            },
            (error) => {
                console.error('Error en la solicitud al backend:', error);
                this.loading = false;
            }
        );
    }

    // Marcar o desmarcar la asistencia de un alumno
    onCheckAsistencia(event: any, asistencia: any) {
        const data = {
            domain_id: this.domainId ?? 1,
            curso_id: this.curso,
            alumno_id: asistencia.alumno_id,
            fecha: this.selectedFecha,
            asistio: event.target.checked,
            docente_id: this.docente_id,
        };
        console.log('data', data);
        this.asistenciaService.updateAsistenciaCurso(data).subscribe(() => {});
    }



    // Método para manejar el cambio de fecha seleccionado
    onFilterDateChange(event: any) {
        this.selectedFecha = event.target.value; // Actualiza la fecha seleccionada
        console.log('Fecha seleccionada:', this.selectedFecha); // Verificar la fecha seleccionada
        this.getAsistenciaCurso(this.domainId, this.curso, this.selectedFecha); // Llama a la API con la nueva fecha seleccionada
    }
}
