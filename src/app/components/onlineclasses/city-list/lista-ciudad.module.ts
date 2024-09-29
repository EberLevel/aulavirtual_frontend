import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AeCityFormComponent } from './ae-city-form/ae-city-form.component';
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
import { CityListComponent } from './city-list.component';
import { ListaCiudadRoutingModule } from './lista-ciudad-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AeCityFormComponent , CityListComponent
  ],
  imports: [
    ListaCiudadRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    PanelModule,
    FormsModule,
    CalendarModule,
    TableModule,
    HttpClientModule,
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
export class ListaCiudadModule { }
