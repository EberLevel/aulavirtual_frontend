import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReferenciasFamiliaresComponent } from './referencias-familiares.component';



@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: '', component: ReferenciasFamiliaresComponent }
  ]
  )],
  exports: [RouterModule]
})
export class ReferenciasFamiliaresRoutingModule { }
