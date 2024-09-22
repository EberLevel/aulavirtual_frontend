import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './tareas.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TareasComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
