import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AeInformacionAcademicaCandidatoComponent } from './ae-informacion-academica-candidato/ae-informacion-academica-candidato.component';
import { InformacionAcademicaCandidatoComponent } from './informacion-academica-candidato.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionAcademicaCandidatoRoutingModule } from './informacion-academica-candidato-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    InformacionAcademicaCandidatoComponent,
    AeInformacionAcademicaCandidatoComponent
  ],
  imports: [
    CommonModule,
    InformacionAcademicaCandidatoRoutingModule,
    TableModule,
    PanelModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  exports: [
    InformacionAcademicaCandidatoComponent 
  ]
})
export class InformacionAcademicaCandidatoModule { }
