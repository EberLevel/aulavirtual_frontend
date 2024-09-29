import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEgresadosComponent } from './lista-egresados.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: ListaEgresadosComponent }
  ]
  )],
  exports: [RouterModule]
})
export class ListaEgresadosRoutingModule { }
