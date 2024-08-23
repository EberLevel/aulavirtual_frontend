import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ToastModule } from 'primeng/toast'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { DocentesRoutingModule } from './docentes-routing.module';
import { BandejaDocenteComponent } from './bandeja-docente/bandeja-docente.component';
import { RegDocenteComponent } from './dialog/reg-docente/reg-docente.component';
import { CursosDocentesComponent } from './cursos-docentes/cursos-docente/cursos-docentes.component';
import { HorarioDocenteComponent } from './dialog/horario-docente/horario-docente.component';
import { RegVerTodoComponent } from './dialog/reg-ver-todo/reg-ver-todo.component';
import { AsistenciaAlumnoComponent } from './dialog/asistencia-alumno/asistencia-alumno.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TemasDocenteComponent } from './dialog/temas-docente/temas-docente.component';
import { EvaluacionesDocenteMenuComponent } from './evaluaciones-docente-menu/evaluaciones-docente-menu/evaluaciones-docente-menu.component';
import { BandejaPreguntasDocenteComponent } from './evaluaciones-docente-menu/bandeja-preguntas-docente/bandeja-preguntas-docente.component';
import { EditDocenteComponent } from './dialog/edit-docente/edit-docente.component';
import { HorarioComponent } from './horario/horario.component';

@NgModule({
  declarations: [
    BandejaDocenteComponent,
    RegDocenteComponent,
    CursosDocentesComponent,
    HorarioDocenteComponent,
    RegVerTodoComponent,
    AsistenciaAlumnoComponent,
    TemasDocenteComponent,
    EvaluacionesDocenteMenuComponent,
    BandejaPreguntasDocenteComponent,
    EditDocenteComponent,
    
  ],
  imports: [
    CommonModule,
    DocentesRoutingModule,
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
    CheckboxModule,
    ReactiveFormsModule
  ]
})
export class DocentesModule { }
