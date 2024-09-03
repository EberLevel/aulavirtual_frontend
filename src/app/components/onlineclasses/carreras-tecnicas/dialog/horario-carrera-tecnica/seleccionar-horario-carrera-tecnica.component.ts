import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HorarioService } from 'src/app/components/onlineclasses/service/horario.service';
import { AulaService } from 'src/app/components/onlineclasses/service/aula.service';
import { HelpersService } from 'src/app/helpers.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-seleccionar-horario-carrera-tecnica',
  templateUrl: './seleccionar-horario-carrera-tecnica.component.html',
  styleUrls: ['./seleccionar-horario-carrera-tecnica.component.scss']
})
export class SeleccionarHorarioCarreraTecnicaComponent implements OnInit {
  loading: boolean = false;
  parametroForm: FormGroup;
  curso: any;
  aulas: any[] = [];
  aulaDisponibilidad: any[] = [];
  cursoHorarios: any[] = [];
  domain_id: number = 1;
  calendarOptions: CalendarOptions;
  showReplicateDialog: boolean = false;
  selectedEvent: any;
  replicateStartDate: Date = new Date();
  replicateEndDate: Date = new Date();
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedDays: boolean[] = [true, true, true, true, true, false, false];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private horarioService: HorarioService,
    private aulaService: AulaService,
    private helpersService: HelpersService
  ) {
    this.domain_id = this.helpersService.getDominioId();
    this.curso = this.config.data.data;
    this.parametroForm = this.fb.group({
      aula_id: ['', Validators.required]
    });
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
    };
  }

  ngOnInit() {
    this.getAulas();
    this.getCursoHorarios();
  }

  getAulas() {
    this.aulaService.getAulas(this.domain_id).subscribe(
      (response: any) => {
        this.aulas = Array.isArray(response.data) ? response.data : [];
      },
      (error: any) => {
        this.helpersService.showErrorMessage('Error al obtener las aulas');
      }
    );
  }

  onAulaChange(event: any) {
    const aulaId = event.value;
    this.getAulaDisponibilidad(aulaId);
    this.getCursoHorarios();
  }

  getAulaDisponibilidad(aulaId: number) {
    this.aulaService.getDisponibilidad(aulaId).subscribe(
      (res: any) => {
        this.aulaDisponibilidad = res.data;
        this.updateCalendar();
      },
      error => {
        this.helpersService.showErrorMessage('Error al obtener la disponibilidad del aula');
      }
    );
  }

  getCursoHorarios() {
    this.horarioService.getHorario(this.curso.id).subscribe(
      (response: any) => {
        this.cursoHorarios = response;
        this.updateCalendar();
      },
      (error: any) => {
        this.helpersService.showErrorMessage('Error al obtener los horarios del curso');
      }
    );
  }

  updateCalendar() {
    const events = [
      ...this.aulaDisponibilidad.map(d => {
        let fechaInicio = new Date(`${d.fecha}T${d.hora_inicio}`);
        let fechaFin = new Date(`${d.fecha}T${d.hora_fin}`);
        console.log('Disponibilidad:', fechaInicio, '-', fechaFin,d.id,'aula_id:',d.aula_id); 
        return ({
        start: fechaInicio,
        end: fechaFin,
        title: 'Disponibilidad',
        backendId: d.id,
        backgroundColor: 'green',
        borderColor: 'green', // Si quieres que el borde sea del mismo color
        display: "background", // Esto hará que el evento sea un fondo
        allDay: false, // Asegúrate de que no esté configurado como "todo el día"
        aula_id: d.aula_id,
        availability_id: d.id
      })}),
      ...this.cursoHorarios.map(h => {
        let fechaInicio = new Date(`${h.fecha_inicio}T${h.hora_inicio}`);
        let fechaFin = new Date(`${h.fecha_fin}T${h.hora_fin}`);
        return ({
        title: 'Horario del curso',
        start: fechaInicio,
        end: fechaFin,
        backgroundColor: 'blue',
        allDay: false, // Asegúrate de que no esté configurado como "todo el día"

      })}
    )
    ];
    this.calendarOptions = {
      ...this.calendarOptions,
      events
    };
    console.log('Events:', events);
  }

  handleDateSelect(selectInfo: any) {
    const { start, end } = selectInfo;
    console.log('Fecha seleccionada:', start, end);
    
    if (this.isWithinAulaDisponibilidad(start, end)) {
      const title = 'Nuevo horario';
      const aulaId = this.parametroForm.value.aula_id;
      const availabilityId = this.getAvailabilityId(start, end);
      
      const newEvent = { 
        title, 
        start, 
        end,
        backgroundColor: 'blue',
        extendedProps: {
          aula_id: aulaId,
          availability_id: availabilityId
        }
      };
      console.log('Nuevo evento creado:', newEvent);
      
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as any[]),
        newEvent
      ];
    } else {
      this.helpersService.showErrorMessage('El horario seleccionado no está dentro de la disponibilidad del aula');
    }
  }
  
  getAvailabilityId(start: Date, end: Date): number | undefined {
    const disponibilidad = this.aulaDisponibilidad.find(d => {
      const availabilityStart = new Date(`${d.fecha}T${d.hora_inicio}`);
      const availabilityEnd = new Date(`${d.fecha}T${d.hora_fin}`);
      return start >= availabilityStart && end <= availabilityEnd;
    });
    console.log('Disponibilidad encontrada:', disponibilidad);
    return disponibilidad?.id;
  }

  handleEventClick(clickInfo: any) {
    this.selectedEvent = clickInfo.event;
    this.replicateStartDate = new Date(this.selectedEvent.start);
    this.replicateEndDate = new Date(this.selectedEvent.start);
    this.replicateEndDate.setMonth(this.replicateEndDate.getMonth() + 1);
    this.showReplicateDialog = true;
  }

  handleEvents(events: any) {
    // Manejar eventos si es necesario
  }

  isWithinAulaDisponibilidad(start: Date, end: Date): boolean {
    // Obtener la fecha en formato YYYY-MM-DD
    const fechaEvento = start.toISOString().split('T')[0];
  
    // Filtrar las disponibilidades para la fecha específica del evento
    const disponibilidadesDia = this.aulaDisponibilidad.filter(d => d.fecha === fechaEvento);
  
    // Verificar si el nuevo horario está dentro de alguna disponibilidad existente
    return disponibilidadesDia.some(d => {
      const availabilityStart = new Date(`${d.fecha}T${d.hora_inicio}`);
      const availabilityEnd = new Date(`${d.fecha}T${d.hora_fin}`);
  
      console.log('Disponibilidad:', availabilityStart, '-', availabilityEnd);
      console.log('Nuevo horario:', start, '-', end);
  
      // Verificar si el nuevo horario está completamente dentro de la disponibilidad
      return start >= availabilityStart && end <= availabilityEnd;
    });
  }

  replicateHorario() {
    if (this.selectedEvent && this.replicateStartDate && this.replicateEndDate) {
      console.log('Evento seleccionado para replicar:', this.selectedEvent);
      
      const newEvents: any[] = [];
      const eventDuration = this.selectedEvent.end.getTime() - this.selectedEvent.start.getTime();
  
      for (let date = new Date(this.replicateStartDate); date <= this.replicateEndDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        if (this.selectedDays[dayOfWeek === 0 ? 6 : dayOfWeek - 1]) {
          const startCopy = new Date(date);
          startCopy.setHours(this.selectedEvent.start.getHours(), this.selectedEvent.start.getMinutes(), 0, 0);
          const endCopy = new Date(startCopy.getTime() + eventDuration);
  
          if (this.isWithinAulaDisponibilidad(startCopy, endCopy)) {
            const newEvent = {
              id: Math.floor(Math.random() * 10000),
              title: 'Horario replicado',
              start: startCopy,
              end: endCopy,
              backgroundColor: 'blue',
              extendedProps: {
                aula_id: this.selectedEvent.extendedProps?.aula_id,
                availability_id: this.getAvailabilityId(startCopy, endCopy)
              }
            };
            console.log('Nuevo evento replicado:', newEvent);
            newEvents.push(newEvent);
          }
        }
      }
  
      const updatedEvents = [
        ...(this.calendarOptions.events as any[]).filter(event => event.title === 'Disponibilidad' || event.display === 'background'),
        ...newEvents
      ];
  
      console.log('Eventos actualizados:', updatedEvents);
  
      this.calendarOptions = {
        ...this.calendarOptions,
        events: updatedEvents
      };
  
      this.showReplicateDialog = false;
    }
  }

  saveHorario() {
    if (this.parametroForm.valid) {
      const horarios = (this.calendarOptions.events as any[])
        .filter(event => event.title !== 'Horario del curso' && !event.display)
        .map(event => ({
          day_id: event.start.getDay(),
          fecha_inicio: event.start.toISOString().split('T')[0],
          fecha_fin: event.end.toISOString().split('T')[0],
          hora_inicio: event.start.toTimeString().split(' ')[0],
          hora_fin: event.end.toTimeString().split(' ')[0],
          aula_id: event.aula_id,
          availability_id: event.extendedProps.availability_id,
          curso_id:this.curso.id,
          docente_id:this.curso.docente_id,
          domain_id: this.domain_id
        }));

      const data = {
        curso_id: this.curso.id,
        aula_id: this.parametroForm.value.aula_id,
        horarios
      };

      this.loading = true;
      this.horarioService.saveHorario(data).subscribe(
        (response: any) => {
          this.helpersService.showSuccessMessage('Horario guardado correctamente');
          this.ref?.close();
        },
        (error: any) => {
          this.helpersService.showErrorMessage('Error al guardar el horario');
        }
      ).add(() => {
        this.loading = false;
      });
    } else {
      this.helpersService.showErrorMessage('Por favor, complete todos los campos requeridos');
    }
  }

  closeModal(event: Event) {
    event.preventDefault();
    this.ref?.close();
  }
}