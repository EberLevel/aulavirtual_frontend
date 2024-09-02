import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExperienciaLaboralComponent } from './experiencia-laboral.component';



@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: ExperienciaLaboralComponent }
  ]
  )],
  exports: [RouterModule]
})
export class ExperienciaLaboralRoutingModule { }
