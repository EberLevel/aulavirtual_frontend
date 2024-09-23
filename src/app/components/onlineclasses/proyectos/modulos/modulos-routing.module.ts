import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulosComponent } from './modulos.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ModulosComponent },
      {
        path: ':modulo_id/tareas',
        loadChildren: () =>
          import('./tareas/tareas.module').then(
            (m) => m.TareasModule
          ),
      },
    ])
  ],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
