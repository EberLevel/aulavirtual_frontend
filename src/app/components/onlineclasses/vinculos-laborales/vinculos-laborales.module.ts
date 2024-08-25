import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinculosLaboralesComponent } from './vinculos-laborales.component';
import { PanelModule } from 'primeng/panel';
import { VinculosLaboralesRoutingModule } from './vinculos-laborales-routing.module';
import { FormsModule } from '@angular/forms';
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
import { AeVinculosLaboralesComponent } from './ae-vinculos-laborales/ae-vinculos-laborales.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VinculosLaboralesComponent,
    AeVinculosLaboralesComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PanelModule,
    VinculosLaboralesRoutingModule,
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
export class VinculosLaboralesModule { }
