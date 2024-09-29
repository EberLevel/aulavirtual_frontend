import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesCandidatoComponent } from './datos-personales-candidato.component';
import { AeDatosPersonalesCandidatoComponent } from './ae-datos-personales-candidato/ae-datos-personales-candidato.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { InformacionAcademicaCandidatoModule } from '../informacion-academica-candidato/informacion-academica-candidato.module';
import { DatosPersonalesCandidatoRoutingModule } from './datos-personales-candidato-routing.module';
import { InformacionAcademicaModule } from "../../onlineclasses/informacion-academica/informacion-academica.module";



@NgModule({
  declarations: [
    DatosPersonalesCandidatoComponent,
    AeDatosPersonalesCandidatoComponent
  ],
  imports: [
    CommonModule,
    DatosPersonalesCandidatoRoutingModule,
    ReactiveFormsModule,
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
    InformacionAcademicaCandidatoModule,
    InformacionAcademicaModule
],
providers: [DynamicDialogConfig, DynamicDialogRef], 
})
export class DatosPersonalesCandidatoModule { }
