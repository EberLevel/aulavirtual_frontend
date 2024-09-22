import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectosComponent } from './proyectos.component';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([
            { path: '', component: ProyectosComponent },
            {
                path: ':proyecto_id/modulos',
                loadChildren: () =>
                    import('./modulos/modulos.module').then(
                        (m) => m.ModulosModule
                    ),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ProyectosRoutingModule {}
