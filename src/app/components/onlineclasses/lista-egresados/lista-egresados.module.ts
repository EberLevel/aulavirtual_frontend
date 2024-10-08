import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { CapacitacionPostulanteModule } from '../capacitacion-postulante/capacitacion-postulante.module';
import { ExperienciaLaboralModule } from '../experiencia-laboral/experiencia-laboral.module';
import { FormularioFinalPostulanteModule } from '../formulario-final-postulante/formulario-final-postulante.module';
import { InformacionAcademicaModule } from '../informacion-academica/informacion-academica.module';
import { ReferenciasFamiliaresModule } from '../referencias-familiares/referencias-familiares.module';
import { ReferenciasLaboralesModule } from '../referencias-laborales/referencias-laborales.module';
import { AeListaEgresadosComponent } from './ae-lista-egresados/ae-lista-egresados.component';
import { ListaEgresadosComponent } from './lista-egresados.component';
import { ListaEgresadosRoutingModule } from './lista-egresados-routing.module';



@NgModule({
  declarations: [ListaEgresadosComponent, AeListaEgresadosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListaEgresadosRoutingModule,
    PanelModule,
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
  ],
  exports:[
    ListaEgresadosComponent
  ]
})
export class ListaEgresadosModule { }
