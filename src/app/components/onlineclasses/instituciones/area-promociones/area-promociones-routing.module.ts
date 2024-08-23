import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaPromocionesComponent } from './area-promociones.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: AreaPromocionesComponent }
  ]
  )],
  exports: [RouterModule]
})
export class AreaPromocionesRoutingModule { }
