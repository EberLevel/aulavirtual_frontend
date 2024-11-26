import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoModalRoutingModule } from './pago-modal-routing.module';
import { PagoModalComponent } from './pago-modal.component';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    PagoModalComponent
  ],
  imports: [
    CommonModule,
    PagoModalRoutingModule,
    PanelModule,
    ToastModule,
    TableModule,
    ButtonModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    InputTextModule,
    TooltipModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class PagoModalModule { }
