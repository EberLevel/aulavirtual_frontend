import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionAcademicaComponent } from './informacion-academica.component';



@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: InformacionAcademicaComponent }
  ]
  )],
  exports: [RouterModule]
})
export class InformacionAcademicaRoutingModule { }
