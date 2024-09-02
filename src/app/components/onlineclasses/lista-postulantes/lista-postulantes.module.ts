import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPostulantesComponent } from './lista-postulantes.component';
import { PanelModule } from 'primeng/panel';
import { ListaPostulantesRoutingModule } from './lista-postulantes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { AeListaPostulantesComponent } from './ae-lista-postulantes/ae-lista-postulantes.component';
import { FormularioFinalPostulanteModule } from "../formulario-final-postulante/formulario-final-postulante.module";
import { InformacionAcademicaModule } from "../informacion-academica/informacion-academica.module";
import { CapacitacionPostulanteModule } from "../capacitacion-postulante/capacitacion-postulante.module";
import { ExperienciaLaboralModule } from "../experiencia-laboral/experiencia-laboral.module";
import { ReferenciasLaboralesModule } from "../referencias-laborales/referencias-laborales.module";
import { ReferenciasFamiliaresModule } from "../referencias-familiares/referencias-familiares.module";



@NgModule({
  declarations: [
    ListaPostulantesComponent,
    AeListaPostulantesComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PanelModule,
    ListaPostulantesRoutingModule,
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
    ProgressBarModule,
    ToastModule,
    ConfirmPopupModule,
    FileUploadModule,
    TooltipModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    FileUploadModule,
    EditorModule,
    DialogModule,
    DynamicDialogModule,
    TranslateModule,
    InputTextModule,
    MultiSelectModule,
    FormularioFinalPostulanteModule,
    InformacionAcademicaModule,
    CapacitacionPostulanteModule,
    ExperienciaLaboralModule,
    ReferenciasLaboralesModule,
    ReferenciasFamiliaresModule
]
})
export class ListaPostulantesModule { }
