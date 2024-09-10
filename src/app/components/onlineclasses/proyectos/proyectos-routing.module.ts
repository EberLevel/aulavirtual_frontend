import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectosComponent } from './proyectos.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([
    { path: '', component: ProyectosComponent },
    {
      path: ':proyecto_id/tareas', loadChildren: () =>
        import('./tareas/tareas.module').then(
          (m) => m.TareasModule
        ), }
  ])],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
