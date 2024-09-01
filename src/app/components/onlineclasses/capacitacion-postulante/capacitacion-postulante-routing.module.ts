import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapacitacionPostulanteComponent } from './capacitacion-postulante.component';



@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: CapacitacionPostulanteComponent }
  ]
  )],
  exports: [RouterModule]
})
export class CapacitacionPostulanteRoutingModule { }
