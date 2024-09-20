import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ToastModule } from 'primeng/toast'
import { FormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { RippleModule } from 'primeng/ripple'
import { MultiSelectModule } from 'primeng/multiselect'
import { DropdownModule } from 'primeng/dropdown'
import { PanelModule } from 'primeng/panel'
import { CalendarModule } from 'primeng/calendar'
import { ProgressBarModule } from 'primeng/progressbar'
import { SliderModule } from 'primeng/slider'
import { RatingModule } from 'primeng/rating'
import { FileUploadModule } from 'primeng/fileupload'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import es from '@angular/common/locales/es'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TooltipModule } from 'primeng/tooltip'
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppComponent } from 'src/app/app.component';
import { TranslateModule } from '@ngx-translate/core';

import { CursosRoutingModule } from './cursos-routing.module';
import { BandejaCursosComponent } from './bandeja-cursos/bandeja-cursos.component';
import { RegCursosComponent } from './dialog/reg-cursos/reg-cursos.component';
import { VerEvaluacionesComponent } from './bandeja-cursos/ver-evaluaciones/ver-evaluaciones.component';
import { VerPreguntasComponent } from './bandeja-cursos/ver-preguntas/ver-preguntas.component';
import { ResponderPreguntaComponent } from './bandeja-cursos/responder-pregunta/responder-pregunta.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import {NgxSpinnerModule} from 'ngx-spinner';
import { VerGrupoEvaluacionesAlumnoComponent } from './bandeja-cursos/ver-grupo-evaluaciones-alumno/ver-grupo-evaluaciones-alumno.component';


@NgModule({
  declarations: [ BandejaCursosComponent,RegCursosComponent, VerEvaluacionesComponent, VerPreguntasComponent, ResponderPreguntaComponent, VerGrupoEvaluacionesAlumnoComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    FormsModule,
    CalendarModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    InputTextareaModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    PanelModule,
    ProgressBarModule,
    ToastModule,
    ConfirmPopupModule,
    FileUploadModule,
    TooltipModule,
    ToastModule,
    PanelModule,
    TableModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    FileUploadModule,
    EditorModule,
    DialogModule,
    DynamicDialogModule,
    TranslateModule,
    ReactiveFormsModule, // Agrega ReactiveFormsModule al array de imports
    NgxSpinnerModule
  ]
})
export class CursosModule { }
