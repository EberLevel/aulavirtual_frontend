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
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

import { AvanceCurricularRoutingModule } from './avance-curricular-routing.module';
import { BandejaAvanceCurricularComponent } from './bandeja-avance-curricular/bandeja-avance-curricular.component';
import { EditorModule } from 'primeng/editor';


@NgModule({
  declarations: [
    
    BandejaAvanceCurricularComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    AvanceCurricularRoutingModule,
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
    ConfirmPopupModule,
    ConfirmDialogModule,
    FileUploadModule,
    DialogModule,    
    DynamicDialogModule,      
    TranslateModule,
    RippleModule,
    MultiSelectModule,
    EditorModule
  ]
})
export class AvanceCurricularModule { }
