import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HelpersService } from 'src/app/helpers.service';
import { AulaService } from '../../service/aula.service';
import { HorarioService } from '../../service/horario.service';
import { CursoService } from '../../service/cursos.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {
  loading: boolean = false;
  parametroForm: FormGroup;
  curso: any;
  cursos: any[] = [];
  originalAulaDisponibilidad: any = {};
  aulaDisponibilidad: any = {};
  cursoHorarios: any = {};
  domain_id: number = 1;
  calendarOptionsMap: { [key: number]: CalendarOptions } = {};
  showReplicateDialog: boolean = false;
  selectedEvent: any;
  replicateStartDate: Date = new Date();
  replicateEndDate: Date = new Date();
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedDays: boolean[] = [true, true, true, true, true, false, false];
  selectedDates: Date[] = [];
  aulasDisponibles: any[] = [];
  originalAulasDisponibles: any[] = [];
  horarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private aulaService: AulaService,
    private helpersService: HelpersService,
    private cursoService: CursoService
  ) {
    this.domain_id = this.helpersService.getDominioId();
    this.parametroForm = this.fb.group({
      aula_id: ['', Validators.required]
    });
    this.horarioForm = this.fb.group({
      aula_id: ['', Validators.required],
      dias: [[], Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAulas();
    this.getCursos();
  }

  agregarHorario() {
    if (this.horarioForm.valid) {
      const nuevoHorario = this.horarioForm.value;
      console.log('Nuevo horario:', nuevoHorario);
      this.actualizarCalendario(nuevoHorario);
    }
  }

  actualizarCalendario(nuevoHorario: any) {
    const aulaId = nuevoHorario.aula_id;
    const diasSeleccionados = nuevoHorario.dias.map((dia: number) => dia === 0 ? 7 : dia);

    const eventoCalendario = {
      title: this.curso.nombre,
      daysOfWeek: diasSeleccionados,
      startTime: nuevoHorario.horaInicio,
      endTime: nuevoHorario.horaFin,
      startRecur: new Date(),
      backgroundColor: 'blue',
      borderColor: 'blue'
    };

    if (!this.calendarOptionsMap[aulaId]) {
      this.calendarOptionsMap[aulaId] = this.getDefaultCalendarOptions(aulaId);
    }

    this.calendarOptionsMap[aulaId].events = [
      ...(this.calendarOptionsMap[aulaId].events as any[]),
      eventoCalendario
    ];
  }

  getDefaultCalendarOptions(aulaId: number): CalendarOptions {
    return {
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
      select: (selectInfo) => this.handleDateSelect(aulaId, selectInfo),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      events: []
    };
  }

  selectCurso(curso: any) {
    this.curso = curso;
    this.selectedDates = [];
  }

  onDateClear() {
    this.aulasDisponibles = [];
  }

  onDateSelect(date: any) {
    console.log(date,this.selectedDates);
    this.aulasDisponibles = this.originalAulasDisponibles;
    const newAulasDisponibles = this.updateAulasDisponibles(date);
    this.aulasDisponibles =newAulasDisponibles
  }

  updateAulasDisponibles(date: Date) {
    return this.aulasDisponibles.filter(aula => {
      const aulaId = aula.id;
      const disponibilidad = this.originalAulaDisponibilidad[aulaId];
      const isAvailable = this.selectedDates.every(selectedDate => {
        return disponibilidad.some((d: { fecha: any; hora_inicio: any; hora_fin: any; }) => {
          const formatedSelectedDate = this.helpersService.formatDate(selectedDate);
          const availabilityStart = new Date(`${d.fecha}T${d.hora_inicio}`);
          const availabilityEnd = new Date(`${d.fecha}T${d.hora_fin}`);
          console.log(selectedDate);
          console.log(availabilityStart, availabilityEnd);
          console.log(selectedDate >= availabilityStart && selectedDate <= availabilityEnd)
          return selectedDate >= availabilityStart && selectedDate <= availabilityEnd;
        });
      });
      return isAvailable;
    });
  }

  getCursos() {
    this.cursoService.getCursosPorDocente(this.helpersService.getDocenteId()).subscribe(
      (response: any) => {
        console.log(response, 'cursos');
        this.cursos = response;
      },
      (error: any) => {
        this.helpersService.showErrorMessage('Error al obtener los cursos');
      }
    );
  }

  getAulas() {
    this.aulaService.getAulas(this.domain_id).subscribe(
      (response: any) => {
        this.aulasDisponibles = Array.isArray(response.data) ? response.data : [];
        this.originalAulasDisponibles = Array.isArray(response.data) ? response.data : [];
        this.originalAulasDisponibles.forEach(aula => {
          const aulaId = aula.id;
          this.calendarOptionsMap[aulaId] = this.getDefaultCalendarOptions(aulaId);
          this.getAulaDisponibilidad(aulaId);
        });
      },
      (error: any) => {
        this.helpersService.showErrorMessage('Error al obtener las aulas');
      }
    );
  }



  getAulaDisponibilidad(aulaId: number) {
    this.aulaService.getDisponibilidad(aulaId).subscribe(
      (res: any) => {
        this.originalAulaDisponibilidad[aulaId] = res.data;
        this.aulaDisponibilidad[aulaId] = res.data;
        this.updateCalendar(aulaId);
        console.log('Disponibilidad del aula', this.aulaDisponibilidad);
      },
      error => {
        this.helpersService.showErrorMessage('Error al obtener la disponibilidad del aula');
      }
    );
  }

  getCursoHorarios(aulaId: number) {
    this.horarioService.getHorario(this.curso.id).subscribe(
      (response: any) => {
        this.cursoHorarios[aulaId] = response;
        this.updateCalendar(aulaId);
      },
      (error: any) => {
        this.helpersService.showErrorMessage('Error al obtener los horarios del curso');
      }
    );
  }

  updateCalendar(aulaId: number) {
    const events = [
      ...this.aulaDisponibilidad[aulaId].map((d: { fecha: any; hora_inicio: any; hora_fin: any; id: any; aula_id: any; }) => ({
        start: new Date(`${d.fecha}T${d.hora_inicio}`),
        end: new Date(`${d.fecha}T${d.hora_fin}`),
        title: 'Disponibilidad',
        backendId: d.id,
        backgroundColor: 'green',
        borderColor: 'green',
        display: "background",
        allDay: false,
        aula_id: d.aula_id,
        availability_id: d.id
      })),
    ];

    this.calendarOptionsMap[aulaId] = {
      ...this.calendarOptionsMap[aulaId],
      events
    };
  }

  handleDateSelect(aulaId: number, selectInfo: any) {
    const { start, end } = selectInfo;

    if (this.isWithinAulaDisponibilidad(aulaId, start, end)) {
      const title = 'Nuevo horario';
      const availabilityId = this.getAvailabilityId(aulaId, start, end);

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

      this.calendarOptionsMap[aulaId].events = [
        ...(this.calendarOptionsMap[aulaId].events as any[]),
        newEvent
      ];
    } else {
      this.helpersService.showErrorMessage('El horario seleccionado no está dentro de la disponibilidad del aula');
    }
  }

  getAvailabilityId(aulaId: number, start: Date, end: Date): number | undefined {
    const disponibilidad = this.aulaDisponibilidad[aulaId].find((d: { fecha: any; hora_inicio: any; hora_fin: any; }) => {
      const availabilityStart = new Date(`${d.fecha}T${d.hora_inicio}`);
      const availabilityEnd = new Date(`${d.fecha}T${d.hora_fin}`);
      return start >= availabilityStart && end <= availabilityEnd;
    });
    return disponibilidad ? disponibilidad.id : undefined;
  }

  isWithinAulaDisponibilidad(aulaId: number, start: Date, end: Date): boolean {
    return this.aulaDisponibilidad[aulaId].some((d: { fecha: any; hora_inicio: any; hora_fin: any; }) => {
      const availabilityStart = new Date(`${d.fecha}T${d.hora_inicio}`);
      const availabilityEnd = new Date(`${d.fecha}T${d.hora_fin}`);
      return start >= availabilityStart && end <= availabilityEnd;
    });
  }

  handleEventClick(clickInfo: any) {
    this.selectedEvent = clickInfo.event;
    this.showReplicateDialog = true;
  }

  handleEvents(events: any) {
    // Puedes manejar eventos aquí si es necesario
  }

  onReplicateDialogClose() {
    this.showReplicateDialog = false;
  }

  onReplicateDialogSave() {
    if (this.selectedEvent) {
      const newEvents = this.generateReplicatedEvents();
      const aulaId = this.selectedEvent.extendedProps.aula_id;

      this.calendarOptionsMap[aulaId].events = [
        ...(this.calendarOptionsMap[aulaId].events as any[]),
        ...newEvents
      ];

      this.showReplicateDialog = false;
    }
  }

  generateReplicatedEvents(): any[] {
    const events: any[] = [];
    let currentDate = new Date(this.replicateStartDate);

    while (currentDate <= this.replicateEndDate) {
      if (this.selectedDays[currentDate.getDay()]) {
        const newEvent = {
          ...this.selectedEvent.toPlainObject(),
          start: new Date(currentDate),
          end: new Date(currentDate),
          id: undefined // Nueva ID para evitar colisiones
        };
        events.push(newEvent);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return events;
  }
}
