import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionAcademicaCandidatoComponent } from './informacion-academica-candidato.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: InformacionAcademicaCandidatoComponent }
  ]
  )],
  exports: [RouterModule]
})
export class InformacionAcademicaCandidatoRoutingModule { }
