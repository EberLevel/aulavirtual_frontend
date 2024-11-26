import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUnidadDidacticaComponent } from './list-unidad-didactica.component';

const routes: Routes = [];


@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: ListUnidadDidacticaComponent }
  ]
  )],
  exports: [RouterModule]
})
export class ListUnidadDidacticaRoutingModule { }