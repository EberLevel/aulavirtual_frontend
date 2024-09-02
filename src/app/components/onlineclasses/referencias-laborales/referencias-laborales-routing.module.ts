import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReferenciasLaboralesComponent } from './referencias-laborales.component';



@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: ReferenciasLaboralesComponent }
  ]
  )],
  exports: [RouterModule]
})
export class ReferenciasLaboralesRoutingModule { }
