import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/demo/service/event.service';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit {
    events: any[] = [];
    today: string = '';
    calendarOptions: any = {
        initialView: 'dayGridMonth',
    };
    showDialog: boolean = false;
    clickedEvent: any = null;
    dateClicked: boolean = false;
    edit: boolean = false;
    tags: any[] = [];
    view: string = '';
    changedEvent: any;
    courseStyles: {
        [key: string]: {
            backgroundColor: string;
            borderColor: string;
            textColor: string;
        };
    } = {};

    constructor(
        private eventService: EventService,
        private helpersService: HelpersService
    ) {}

    ngOnInit(): void {
        this.today = new Date().toISOString().split('T')[0];
        const data = {
            docente_id: this.helpersService.getDocenteId() ?? 1,
            domain_id: this.helpersService.getDominioId(),
        };

        this.eventService.getEventsDocente(data).subscribe((events) => {
            this.events = this.getEventsDocente(events);
            this.calendarOptions = {
                ...this.calendarOptions,
                events: this.events,
            };

            // Mapeo para obtener tags únicos
            this.tags = this.events
                .map((item) => {
                    if (!this.tags.includes(item.tag)) {
                        return item.tag;
                    }
                })
                .filter((tag) => tag !== undefined); // Elimina cualquier valor undefined
        });

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            height: 720,
            initialDate: this.today,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e: any) => this.onEventClick(e),
            select: (e: any) => this.onDateSelect(e),
            events: this.events, // Set events here
        };
    }

    getEventsDocente(data: any): any {
        console.log(data);
        return data
            .map((item: any) => {
                // Aquí se asume que 'horarios' ya es un array de objetos JSON y no necesita ser parseado
                const horariosParsed = Array.isArray(item.horarios)
                    ? item.horarios
                    : JSON.parse(item.horarios);
                return this.generateEventDetails(horariosParsed, item.nombre);
            })
            .flat();
    }

    generateEventDetails(horarios: any, nombreCurso: string): any {
        const horarioData: {
            day_name: string;
            date: string;
            start: any;
            end: any;
            tag: { color: string; name: string };
            title: string;
            borderColor: string;
            backgroundColor: string;
            textColor: string;
            extendedProps?: any;
        }[] = [];

        const styles = this.getCourseStyles(nombreCurso);

        horarios.forEach((horario: any) => {
            const start = new Date(
                `${horario.fecha_inicio}T${horario.hora_inicio}`
            );
            const endDate = new Date(
                `${horario.fecha_fin}T${horario.hora_fin}`
            );
            const dayId = horario.day_id;
            horarioData.push({
                day_name: this.getDayName(dayId),
                date: this.addDays(start, dayId).toISOString().split('T')[0],
                start: start,
                end: endDate,
                tag: { color: styles.backgroundColor, name: nombreCurso },
                title: nombreCurso,
                borderColor: styles.borderColor,
                backgroundColor: styles.backgroundColor,
                textColor: styles.textColor,
                extendedProps: {
                    docente: horario.docente_name,
                    aulaUbicacion: horario.aula_ubication,
                    aulaName: horario.aula_name,
                },
            });
        });

        return horarioData;
    }

    getCourseStyles(nombreCurso: string) {
        // Si el curso ya tiene estilos, retorna esos estilos
        if (this.courseStyles[nombreCurso]) {
            return this.courseStyles[nombreCurso];
        }

        // Si no, genera nuevos estilos, almacénalos y luego retorna
        const newStyles = this.generateStyles();
        this.courseStyles[nombreCurso] = newStyles;
        return newStyles;
    }

    getDayName(dayId: number) {
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return days[dayId % 7];
    }

    addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    generateStyles() {
        const backgroundColor = '#212121';
        const borderColors = [
            '#f9e79f',
            '#a3e4d7',
            '#abebc6',
            '#f5b041',
            '#ec7063',
            '#cacfd2',
        ];
        const textColors = ['#000000'];

        const randomBorderColor =
            borderColors[Math.floor(Math.random() * borderColors.length)];
        const randomTextColor =
            textColors[Math.floor(Math.random() * textColors.length)];

        return {
            backgroundColor: randomBorderColor,
            borderColor: randomBorderColor,
            textColor: randomTextColor,
        };
    }

    onEventClick(e: any) {
        this.clickedEvent = e.event;
        let plainEvent = e.event.toPlainObject({
            collapseExtendedProps: true,
            collapseColor: true,
        });
        this.view = 'display';
        this.showDialog = true;
        console.log(plainEvent);
        this.changedEvent = { ...plainEvent, ...this.clickedEvent };
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end
            ? this.clickedEvent.end
            : this.clickedEvent.start;
    }

    onDateSelect(e: any) {
        // this.view = 'new';
        // this.showDialog = true;
        // this.changedEvent = { ...e, title: null, description: null, location: null, backgroundColor: null, borderColor: null, textColor: null, tag: { color: null, name: null } };
    }

    handleSave() {
        if (!this.validate()) {
            return;
        } else {
            this.showDialog = false;
            this.clickedEvent = {
                ...this.changedEvent,
                backgroundColor: this.changedEvent.tag.color,
                borderColor: this.changedEvent.tag.color,
                textColor: '#212121',
            };

            if (this.clickedEvent.hasOwnProperty('id')) {
                this.events = this.events.map((i) =>
                    i.id.toString() === this.clickedEvent.id.toString()
                        ? (i = this.clickedEvent)
                        : i
                );
            } else {
                this.events = [
                    ...this.events,
                    {
                        ...this.clickedEvent,
                        id: Math.floor(Math.random() * 10000),
                    },
                ];
            }
            this.calendarOptions = {
                ...this.calendarOptions,
                events: this.events,
            };
            this.clickedEvent = null;
        }
    }

    onEditClick() {
        this.view = 'edit';
    }

    delete() {
        this.events = this.events.filter(
            (i) => i.id.toString() !== this.clickedEvent.id.toString()
        );
        this.calendarOptions = { ...this.calendarOptions, events: this.events };
        this.showDialog = false;
    }

    validate() {
        let { start, end } = this.changedEvent;
        return start && end;
    }
}
