import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoModalComponent } from './pago-modal.component';

const routes: Routes = [
  {path: '', component: PagoModalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoModalRoutingModule { }
