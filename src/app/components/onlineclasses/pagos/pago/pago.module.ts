import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoRoutingModule } from './pago-routing.module';
import { PagoComponent } from './pago.component';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    PagoComponent
  ],
  imports: [
    CommonModule,
    PagoRoutingModule,
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
    CalendarModule
  ]
})
export class PagoModule { }
