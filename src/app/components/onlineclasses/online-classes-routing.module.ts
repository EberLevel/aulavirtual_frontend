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
                path: 'registro-instituciones',
                data: { breadcrumb: 'Registro de Instituciones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/instituciones.module'
                    ).then((m) => m.InstitucionesModule),
            },
            {
                path: 'bandeja-instituciones',
                data: { breadcrumb: 'Bandeja de Instituciones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/bandeja-instituciones/bandeja-instituciones.module'
                    ).then((m) => m.BandejaInstitucionesModule),
            },
            {
                path: 'area-promociones',
                data: { breadcrumb: 'Area de promociones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/area-promociones/area-promociones.module'
                    ).then((m) => m.AreaPromocionesModule),
            },
            {
                path: 'carrera-tecnica',
                data: { breadcrumb: 'Carrera Tecnica' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/carrera-tecnica/carrera-tecnica.module'
                    ).then((m) => m.CarreraTecnicaModule),
            },
            {
                path: 'configuraciones',
                data: { breadcrumb: 'Configuraciones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/configuraciones/configuraciones.module'
                    ).then((m) => m.ConfiguracionesModule),
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
            },
            {
                path: 'bandeja-alumno',
                data: { breadcrumb: 'Bandeja de Alumnos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/gestion-info-alumno/bandeja-alumno/bandeja-alumno.module'
                    ).then((m) => m.BandejaAlumnoModule),
            },
            /* { path: 'registro-alumno', data: { breadcrumb: 'Registrar Alumno' }, loadChildren: () => import('./gestion-info-alumno/registrar-alumno/registrar-alumno.module').then(m => m.RegistrarAlumnoModule) }, */
            {
                path: 'ciclos-academicos',
                data: { breadcrumb: 'Ciclos Academicos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/ciclos/ciclos.module'
                    ).then((m) => m.CiclosModule),
            },
            {
                path: 'area-formacion',
                data: { breadcrumb: 'Área de Formación' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/area-formacion/area-formacion.module'
                    ).then((m) => m.AreaFormacionModule),
            },
            {
                path: 'ciclos',
                data: { breadcrumb: 'Ciclos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/ciclos/ciclos.module'
                    ).then((m) => m.CiclosModule),
            },

            {
                path: 'modulos-formativos',
                data: { breadcrumb: 'Modulos Formativos' },
                loadChildren: () =>
                    import(
                        './instituciones/modulos-formativos/modulos-formativos.module'
                    ).then((m) => m.ModulosFormativosModule),
            },
            {
                path: 'estados',
                data: { breadcrumb: 'Estados' },
                loadChildren: () =>
                    import('./instituciones/estados/estados.module').then(
                        (m) => m.EstadosModule
                    ),
            },
            {
                path: 'estado-cursos',
                data: { breadcrumb: 'Plan de Estudio' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/estado-cursos/estado-cursos.module'
                    ).then((m) => m.EstadoCursosModule),
            },
            {
                path: 'tipo-curso',
                data: { breadcrumb: 'Tipo de Curso' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/instituciones/tipo-curso/tipo-curso.module'
                    ).then((m) => m.TipoCursoModule),
            },
            {
                path: 'asigna-curso-docente',
                data: { breadcrumb: 'Asingna Curso Docente' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/configuraciones/asigna-curso-docente/asgina-curso-docente.module'
                    ).then((m) => m.AsginaCursoDocenteModule),
            },
            {
                path: 'bandeja-curso-docente',
                data: { breadcrumb: 'Bandeja de Curso del Docente' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/configuraciones/bandeja-curso-docente/bandeja-curso-docente.module'
                    ).then((m) => m.BandejaCursoDocenteModule),
            },
            {
                path: 'bandeja-usuarios',
                data: { breadcrumb: 'Bandeja de Usuarios' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/roles-permisos/bandeja-usuarios/bandeja-usuarios.module'
                    ).then((m) => m.BandejaUsuariosModule),
            },
            {
                path: 'parametro-maestro',
                data: { breadcrumb: 'Mantenimiento de Maestros' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/mantenimiento-maestro/mantenimiento-maestro.module'
                    ).then((m) => m.MantenimientoMaestroModule),
            },
            {
                path: 'bandeja-carrtecnicas',
                data: { breadcrumb: 'Bandeja de Carreras técnicas' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/carreras-tecnicas/carreras-tecnicas.module'
                    ).then((m) => m.CarrerasTecnicasModule),
            },
            {
                path: 'bandeja-curso',
                data: { breadcrumb: 'Bandeja de cursos' },
                loadChildren: () =>
                    import('../onlineclasses/cursos/cursos.module').then(
                        (m) => m.CursosModule
                    ),
            },
            {
                path: 'bandeja-docente',
                data: { breadcrumb: 'Bandeja del docente' },
                loadChildren: () =>
                    import('../onlineclasses/docentes/docentes.module').then(
                        (m) => m.DocentesModule
                    ),
            },

            {
                path: 'cursos-docente',
                data: { breadcrumb: 'Cursos del Docente' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/docentes/cursos-docentes/cursos-docente.module'
                    ).then((m) => m.CursosDocenteModule),
            },

            {
                path: 'evaluacion-docente',
                data: { breadcrumb: 'Evaluación Docente' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/docentes/evaluaciones-docente-menu/evaluacion-docente-menu.module'
                    ).then((m) => m.EvaluacionDocenteMenuModule),
            },
            {
                path: 'documentos-alumnos',
                data: { breadcrumb: 'Documentos de gestión' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/gestion-info-alumno/documentos-gestion-alumno/documentos-gestion-alumno.module'
                    ).then((m) => m.DocumentosGestionAlumnoModule),
            },
            {
                path: 'documentos-alumnos',
                data: { breadcrumb: 'Documentos de gestión' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/gestion-info-alumno/documentos-gestion-alumno/documentos-gestion-alumno.module'
                    ).then((m) => m.DocumentosGestionAlumnoModule),
            },
            {
                path: 'avance-curricular',
                data: { breadcrumb: 'Reporte de avance Curricular' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/gestion-info-alumno/avance-curricular/avance-curricular.module'
                    ).then((m) => m.AvanceCurricularModule),
            },
            {
                path: 'lista-postulantes',
                data: { breadcrumb: 'Lista de postulantes' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/lista-postulantes/lista-postulantes.module'
                    ).then((m) => m.ListaPostulantesModule),
            },
            {
                path: 'lista-candidatos',
                data: { breadcrumb: 'Lista de Candidatos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/lista-egresados/lista-egresados.module'
                    ).then((m) => m.ListaEgresadosModule),
            },
            {
                path: 'lista-ciudades',
                data: { breadcrumb: 'Candidatos por Ciudad' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/city-list/lista-ciudad.module'
                    ).then((m) => m.ListaCiudadModule),
            },
            {
                path: 'capacitacion-postulante',
                data: { breadcrumb: 'Capacitacion' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/capacitacion-postulante/capacitacion-postulante.module'
                    ).then((m) => m.CapacitacionPostulanteModule),
            },
            {
                path: 'informacion-academica',
                data: { breadcrumb: 'Informacion Academica' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/informacion-academica/informacion-academica.module'
                    ).then((m) => m.InformacionAcademicaModule),
            },
            {
                path: 'referencias-laborales',
                data: { breadcrumb: 'Referencias Laborales' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/referencias-laborales/referencias-laborales.module'
                    ).then((m) => m.ReferenciasLaboralesModule),
            },
            {
                path: 'referencias-familiares',
                data: { breadcrumb: 'Referencias Familiares' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/referencias-familiares/referencias-familiares.module'
                    ).then((m) => m.ReferenciasFamiliaresModule),
            },
            {
                path: 'experiencia-laboral',
                data: { breadcrumb: 'Experiencia Laboral' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/experiencia-laboral/experiencia-laboral.module'
                    ).then((m) => m.ExperienciaLaboralModule),
            },
            {
                path: 'lista-instituciones',
                data: { breadcrumb: 'Instituciones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/lista-instituciones/lista-instituciones.module'
                    ).then((m) => m.ListaInstitucionesModule),
            },
            {
                path: 'mantenimiento-gestiones',
                data: { breadcrumb: 'Gestiones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/mantenimiento-gestiones/mantenimiento-gestiones.module'
                    ).then((m) => m.MantenimientoGestionesModule),
            },
            {
                path: 'afiliado-partido',
                data: { breadcrumb: 'Afiliado a partidos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/afiliado-partido/afiliado-partido.module'
                    ).then((m) => m.AfiliadoPartidoModule),
            },
            {
                path: 'grado-de-instruccion',
                data: { breadcrumb: 'Grado de instrucción' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/grado-instruccion/grado-instruccion.module'
                    ).then((m) => m.GradoInstruccionModule),
            },
            {
                path: 'vinculos-laborales',
                data: { breadcrumb: 'Vinculos laborales' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/vinculos-laborales/vinculos-laborales.module'
                    ).then((m) => m.VinculosLaboralesModule),
            },
            {
                path: 'documentos-de-identidad',
                data: { breadcrumb: 'Documentos de identidad' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/documentos-identidad/documentos-identidad.module'
                    ).then((m) => m.DocumentosIdentidadModule),
            },
            {
                path: 'tipos-de-documentos-de-gestion',
                data: { breadcrumb: 'Tipos Documentos de gestión' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/documentos-gestion/documentos-gestion.module'
                    ).then((m) => m.DocumentosGestionModule),
            },
            {
                path: 'estado-civil',
                data: { breadcrumb: 'Estado civil' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/estado-civil/estado-civil.module'
                    ).then((m) => m.EstadoCivilModule),
            },
            {
                path: 'nivel-de-puesto',
                data: { breadcrumb: 'Niveles de puesto' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/nivel-puesto/nivel-puesto.module'
                    ).then((m) => m.NivelPuestoModule),
            },
            {
                path: 'modalidad-de-puesto',
                data: { breadcrumb: 'Niveles de puesto' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/modalidad-puesto/modalidad-puesto.module'
                    ).then((m) => m.ModalidadPuestoModule),
            },
            {
                path: 'editar-postulante',
                data: { breadcrumb: 'Editar postulante' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/editar-postulante/editar-postulante.module'
                    ).then((m) => m.EditarPostulanteModule),
            },
            {
                path: 'profesiones',
                data: { breadcrumb: 'Profesiones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/profesiones/profesiones.module'
                    ).then((m) => m.ProfesionesModule),
            },
            {
                path: 'estado-de-avance',
                data: { breadcrumb: 'Estado de avance' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/estado-avance/estado-avance.module'
                    ).then((m) => m.EstadoAvanceModule),
            },
            {
                path: 'escala',
                data: { breadcrumb: 'Escala' },
                loadChildren: () =>
                    import('../onlineclasses/escala/escala.module').then(
                        (m) => m.EscalaModule
                    ),
            },
            {
                path: 'ocupacion-actual',
                data: { breadcrumb: 'Ocupación actual' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/ocupacion-actual/ocupacion-actual.module'
                    ).then((m) => m.OcupacionActualModule),
            },
            {
                path: 'u-formativas',
                data: { breadcrumb: 'Unidades formativas' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/u-formativas/u-formativas.module'
                    ).then((m) => m.UFormativasModule),
            },
            {
                path: 'u-didacticas',
                data: { breadcrumb: 'Unidades didacticas' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/u-didacticas/u-didacticas.module'
                    ).then((m) => m.UDidacticasModule),
            },
            {
                path: 'e-cursos',
                data: { breadcrumb: 'Estado de cursos' },
                loadChildren: () =>
                    import('../onlineclasses/e-cursos/e-cursos.module').then(
                        (m) => m.ECursosModule
                    ),
            },
            {
                path: 't-cursos',
                data: { breadcrumb: 'Tipos de cursos' },
                loadChildren: () =>
                    import('../onlineclasses/t-cursos/t-cursos.module').then(
                        (m) => m.TCursosModule
                    ),
            },
            {
                path: 'modalidad',
                data: { breadcrumb: 'Tipos de cursos' },
                loadChildren: () =>
                    import('../onlineclasses/modalidad/modalidad.module').then(
                        (m) => m.ModalidadModule
                    ),
            },
            {
                path: 'aula',
                data: { breadcrumb: 'Aula' },
                loadChildren: () =>
                    import('../onlineclasses/aulas/aulas.module').then(
                        (m) => m.AulasModule
                    ),
            },

            {
                path: 'capacitaciones',
                data: { breadcrumb: 'Lista de capacitaciones' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/capacitaciones/capacitacion/capacitaciones.module'
                    ).then((m) => m.CapacitacionesModule),
            },
            {
                path: 'foro-alumnos',
                data: { breadcrumb: 'Foro de alumnos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/alumnos/foro-alumnos/foro-alumnos.module'
                    ).then((m) => m.ForoAlumnosRoutingModule),
            },
            {
                path: 'tipo-de-actividad',
                data: { breadcrumb: 'Tipo de actividad' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/tipo-actividad/tipo-actividad.module'
                    ).then((m) => m.TipoActividadModule),
            },
            {
                path: 'registro-de-cursos',
                data: { breadcrumb: 'Registro de cursos' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/registro-cursos/registro-cursos.module'
                    ).then((m) => m.RegistroCursosModule),
            },
            {
                path: 'datos-personales',
                data: { breadcrumb: 'Datos personales' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/registro-alumnos/registro-alumnos.module'
                    ).then((m) => m.RegistroAlumnosModule),
            },
            {
                path: 'lista-roles',
                data: { breadcrumb: 'Lista de roles' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/lista-roles/lista-roles.module'
                    ).then((m) => m.ListaRolesModule),
            },
            {
                path: 'lista-empresas',
                data: { breadcrumb: 'Lista de empresas' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/lista-empresas/lista-empresas.module'
                    ).then((m) => m.ListaEmpresasModule),
            },
            {
                path: 'horario-docente',
                data: { breadcrumb: 'Horario docente' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/docentes/horario/horario.module'
                    ).then((m) => m.HorarioModule),
            },
            {
                path: 'aulas',
                data: { breadcrumb: 'Aulas' },
                loadChildren: () =>
                    import('../onlineclasses/aulas/aulas.module').then(
                        (m) => m.AulasModule
                    ),
            },
            {
                path: 'configuracion-institucion',
                data: { breadcrumb: 'Configuración de Institución' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/configuracion-empresa/configuracion-empresa.module'
                    ).then((m) => m.ConfiguracionEmpresaModule),
            },
            {
                path: 'bolsa-trabajo',
                data: { breadcrumb: 'Bolsa de Trabajo' },
                loadChildren: () =>
                    import(
                        '../onlineclasses/bolsa-trabajo/bolsa-trabajo.module'
                    ).then((m) => m.BolsaTrabajoModule),
            },
            {
                path: 'proyectos',
                data: { breadcrumb: 'Proyectos' },
                loadChildren: () =>
                    import('../onlineclasses/proyectos/proyectos.module').then(
                        (m) => m.ProyectosModule
                    ),
            },
        ]),
    ],

    exports: [RouterModule],
})
export class OnlineClassesRoutingModule {}
