import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenciasFamiliaresComponent } from './referencias-familiares.component';
import { AeReferenciasFamiliaresComponent } from './ae-referencias-familiares/ae-referencias-familiares.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
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
import { ReferenciasFamiliaresRoutingModule } from './referencias-familiares-routing.module';
import { FormularioFinalPostulanteModule } from "../formulario-final-postulante/formulario-final-postulante.module";

@NgModule({
    declarations: [
        ReferenciasFamiliaresComponent,
        AeReferenciasFamiliaresComponent,
    ],
    imports: [
    CommonModule,
    ReferenciasFamiliaresRoutingModule,
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
    ReactiveFormsModule,
    FormularioFinalPostulanteModule
],
})
export class ReferenciasFamiliaresModule {}
