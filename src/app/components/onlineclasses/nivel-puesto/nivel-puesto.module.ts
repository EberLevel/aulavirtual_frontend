import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NivelPuestoComponent } from './nivel-puesto.component';
import { PanelModule } from 'primeng/panel';
import { NivelPuestoRoutingModule } from './nivel-puesto-routing.module';
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
import { AeNivelPuestoComponent } from './ae-nivel-puesto/ae-nivel-puesto.component';

@NgModule({
  declarations: [
    NivelPuestoComponent,
    AeNivelPuestoComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PanelModule,
    NivelPuestoRoutingModule,
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
    ConfirmDialogModule,
    EditorModule,
    DialogModule,
    DynamicDialogModule,
    TranslateModule
  ]
})
export class NivelPuestoModule { }
