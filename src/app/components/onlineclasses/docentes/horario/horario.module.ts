import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioRoutingModule } from './horario-routing.module';
import {HorarioComponent} from './horario.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast'
import { EventService } from 'src/app/demo/service/event.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel'
import {  ReactiveFormsModule } from '@angular/forms'
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HorarioRoutingModule,
        FullCalendarModule,
        DialogModule,
        InputTextareaModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        DropdownModule,
        ToastModule,
        RippleModule,
        NgxSpinnerModule,
        CheckboxModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectModule
    ],
    declarations: [HorarioComponent],
    providers: [EventService]
})
export class HorarioModule { }
