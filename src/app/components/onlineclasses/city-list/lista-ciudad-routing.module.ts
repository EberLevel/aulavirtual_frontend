import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: CityListComponent }
  ]
  )],
  exports: [RouterModule]
})
export class ListaCiudadRoutingModule { }
