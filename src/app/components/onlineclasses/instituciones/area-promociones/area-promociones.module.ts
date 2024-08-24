import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaPromocionesComponent } from './area-promociones.component';
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


import { FieldsetModule } from 'primeng/fieldset';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AreaPromocionesRoutingModule } from './area-promociones-routing.module';
import { AeAreaPromocionesComponent } from './ae-area-promociones/ae-area-promociones.component';


@NgModule({
  declarations: [
    AreaPromocionesComponent,
    AeAreaPromocionesComponent
  ],
  imports: [
    CommonModule,
    AreaPromocionesRoutingModule,
    FormsModule,
    CalendarModule,   
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
    FileUploadModule,
    TooltipModule,
    ToastModule,   
    TableModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    FieldsetModule,
    EditorModule,
    DialogModule,
    TooltipModule,
    ReactiveFormsModule
  ]
})
export class AreaPromocionesModule { }
