import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { TranslateModule } from "@ngx-translate/core";
import { LightgalleryModule } from "lightgallery/angular";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MultiSelectModule } from "primeng/multiselect";
import { PanelModule } from "primeng/panel";
import { ProgressBarModule } from "primeng/progressbar";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { TooltipModule } from "primeng/tooltip";
import { GaleriaComponent } from "./galeria/galeria.component";
import { RegistrarTareaComponent } from "./registrar-tarea/registrar-tarea.component";
import { TareasComponent } from "./tareas.component";
import { TareasRoutingModule } from './tareas-routing.module';

@NgModule({
  declarations: [
    TareasComponent,
    RegistrarTareaComponent,
    GaleriaComponent
  ],
  imports: [
    CommonModule,
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
    TareasRoutingModule,
    CKEditorModule,
    LightgalleryModule
  ]
})
export class TareasModule { }
