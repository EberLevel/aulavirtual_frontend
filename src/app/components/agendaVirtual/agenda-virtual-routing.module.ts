import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                data: { breadcrumd: 'Inicio' },
                loadChildren: () =>
                    import(
                        'src/app/demo/components/dashboards/ecommerce/ecommerce.dashboard.module'
                    ).then((m) => m.EcommerceDashboardModule),
            },
            {
                path: 'datos-personales-candidato',
                data: { breadcrumb: 'Datos personales del candidato' },
                loadChildren: () =>
                    import(
                        '../agendaVirtual/datos-personales-candidato/datos-personales-candidato.module'
                    ).then((m) => m.DatosPersonalesCandidatoModule),
            },
            {
                path: 'informacion-academica-candidato',
                data: { breadcrumb: 'Informacion academica del candidato' },
                loadChildren: () =>
                    import(
                        '../agendaVirtual/informacion-academica-candidato/informacion-academica-candidato.module'
                    ).then((m) => m.InformacionAcademicaCandidatoModule),
            }
        ]),
    ],

    exports: [RouterModule],
})
export class AgendaVirtualRoutingModule { }
