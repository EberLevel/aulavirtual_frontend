import { NgModule } from '@angular/core';
import { BolsaTrabajoComponent } from './bolsa-trabajo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([
    { path: '', component: BolsaTrabajoComponent }
  ])],
  exports: [RouterModule]
})
export class BolsaTrabajoRoutingModule { }
