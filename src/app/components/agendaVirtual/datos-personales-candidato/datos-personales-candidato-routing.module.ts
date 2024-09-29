import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPersonalesCandidatoComponent } from './datos-personales-candidato.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: DatosPersonalesCandidatoComponent }
  ]
  )],
  exports: [RouterModule]
})
export class DatosPersonalesCandidatoRoutingModule { }
