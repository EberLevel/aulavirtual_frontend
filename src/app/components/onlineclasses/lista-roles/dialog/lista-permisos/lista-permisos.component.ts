import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../service/general.service';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HelpersService } from 'src/app/helpers.service';
import { DropdownModule } from 'primeng/dropdown';

interface Permiso {
    id: number | null;
    nombre: string;
    seleccionado: boolean;
    hijos?: Permiso[];
}

@Component({
    selector: 'app-lista-permisos',
    templateUrl: './lista-permisos.component.html',
    styleUrls: ['./lista-permisos.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        PanelModule,
        DropdownModule,
        FormsModule,
        TableModule,
    ],
})
export class ListaPermisosComponent {
    visible: boolean = false;
    nombre: string = '';
    permisos!: any[];
    permisosAgrupados: any[] = [];
    instituciones: any[] = [];
    permisosSeleccionados: Set<number> = new Set();
    selectedInstitucion: any;
    idRol!: number;
    estado!: boolean;
    domain_id: any;

    constructor(
        private router: Router,
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService,
        public ref: DynamicDialogRef,
        private permisoService: GeneralService,
        public config: DynamicDialogConfig,
        private helpersService: HelpersService
    ) {
        this.domain_id = this.helpersService.getDominioId();

        this.permisoService
            .getPermisos(this.domain_id)
            .subscribe((response: any) => {
                this.permisos = response;
                this.organizarPermisosPorGrupo();
            });

        this.permisoService.getEmpresasDropdown().subscribe((response: any) => {
            this.instituciones = response;
        });

        this.idRol = config.data;

        if (this.domain_id) {
            this.permisoService
                .getRolPermisos(this.idRol, this.domain_id)
                .subscribe((response: any[]) => {
                    this.permisosSeleccionados = new Set(
                        response.map((permission) => permission.id)
                    );
                    this.organizarPermisosPorGrupo();
                });
        }
    }

    toggleGrupo(grupo: any) {
        grupo.expanded = !grupo.expanded;
    }

    onInstitucionChange(event: any) {
        this.selectedInstitucion = event.value;
        this.permisoService
            .getRolPermisos(this.idRol, this.selectedInstitucion ?? 1)
            .subscribe((response: any[]) => {
                this.permisosSeleccionados = new Set(
                    response.map((permission) => permission.id)
                );
                this.organizarPermisosPorGrupo();
            });
    }

    onCheckboxChange(permisoId: number | null, event: Event, grupo: any) {
        if (permisoId === null) {
            console.warn(
                `Permiso con ID nulo detectado en el grupo ${grupo.nombre}`
            );
            return;
        }

        const isChecked = (event.target as HTMLInputElement).checked;
        const permisoSeleccionado = this.findPermisoById(
            grupo.permisos,
            permisoId
        );

        if (permisoSeleccionado) {
            this.togglePermisoSeleccion(permisoSeleccionado, isChecked);
        }

        this.verificarSeleccionGrupo(grupo);
    }

    togglePermisoSeleccion(permiso: Permiso, isChecked: boolean) {
        permiso.seleccionado = isChecked;

        if (permiso.hijos && permiso.hijos.length > 0) {
            permiso.hijos.forEach((hijo: Permiso) => {
                this.togglePermisoSeleccion(hijo, isChecked);
            });
        }

        if (permiso.id !== null) {
            if (isChecked) {
                this.permisosSeleccionados.add(permiso.id);
            } else {
                this.permisosSeleccionados.delete(permiso.id);
            }
        }
    }

    verificarSeleccionGrupo(grupo: any) {
        grupo.seleccionado = grupo.permisos.every((permiso: Permiso) =>
            this.verificarSeleccionPermiso(permiso)
        );
    }

    verificarSeleccionPermiso(permiso: Permiso): boolean {
        if (permiso.hijos && permiso.hijos.length > 0) {
            return permiso.hijos.every((hijo) =>
                this.verificarSeleccionPermiso(hijo)
            );
        }
        return permiso.seleccionado;
    }

    ngOnInit() {
        this.organizarPermisosPorGrupo();
    }

    findPermisoById(permisos: Permiso[], id: number | null): Permiso | null {
        if (id === null) {
            console.warn(`Intento de búsqueda de un permiso con ID nulo`);
            return null;
        }

        for (const permiso of permisos) {
            if (permiso.id === id) {
                return permiso;
            } else if (permiso.hijos && permiso.hijos.length > 0) {
                const encontrado = this.findPermisoById(permiso.hijos, id);
                if (encontrado) {
                    return encontrado;
                }
            }
        }
        return null;
    }

    toggleGroup(grupo: any) {
        grupo.isExpanded = !grupo.isExpanded;
    }

    guardarPermisos() {
        const data = {
            id: this.idRol,
            idPermisos: Array.from(this.permisosSeleccionados),
            domain_id: this.domain_id ?? this.selectedInstitucion,
        };
        this.permisoService.guardarRolPermisos(data).subscribe(
            (response: any) => {
                this.closeModal();
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Los Datos se registraron correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                }).then(() => {});
            },
            (error: any) => {
                console.error('Error al guardar el rol', error);
            }
        );
    }

    seleccionarGrupo(grupo: any) {
        grupo.permisos.forEach((permiso: Permiso) => {
            this.togglePermisoSeleccion(permiso, grupo.seleccionado);

            if (permiso.hijos && permiso.hijos.length > 0) {
                permiso.hijos.forEach((hijo: Permiso) => {
                    this.togglePermisoSeleccion(hijo, grupo.seleccionado);
                });
            }
        });
    }

    organizarPermisosPorGrupo() {
        const grupos: { [key: string]: any } = {
            Seguridad: {
                nombre: 'Seguridad',
                id: null,
                seleccionado: false,
                permisos: [
                    {
                        id: null,
                        nombre: 'Configuración',
                        seleccionado: false,
                        hijos: [],
                    },
                    {
                        id: null,
                        nombre: 'Roles y Permisos',
                        seleccionado: false,
                        permisosInternos: [
                            {
                                id: null,
                                nombre: 'Crear Rol',
                                seleccionado: false,
                            },
                            {
                                id: null,
                                nombre: 'Editar Rol',
                                seleccionado: false,
                            },
                            {
                                id: null,
                                nombre: 'Eliminar Rol',
                                seleccionado: false,
                            },
                            {
                                id: null,
                                nombre: 'Asignar Permiso',
                                seleccionado: false,
                            },
                            {
                                id: null,
                                nombre: 'Ver Roles',
                                seleccionado: false,
                            },
                        ],
                        isExpanded: false,
                    },
                    {
                        id: 10,
                        nombre: 'Usuarios',
                        seleccionado: false,
                        hijos: [
                            { id: 11, nombre: 'Nuevo', seleccionado: false },
                            { id: 12, nombre: 'Ver', seleccionado: false },
                            { id: 13, nombre: 'Editar', seleccionado: false },
                            { id: 14, nombre: 'Eliminar', seleccionado: false },
                        ],
                        isExpanded: false,
                    },
                ],
                isExpanded: false,
            },
            EstructuraOrganica: {
                nombre: 'ESTRUCTURA ORGÁNICA',
                id: null,
                seleccionado: false,
                permisos: [
                    {
                        id: null,
                        nombre: 'Mantenimientos',
                        seleccionado: false,
                        hijos: [],
                    },
                    {
                        id: null,
                        nombre: 'Instituciones',
                        seleccionado: false,
                        hijos: [
                            { id: 17, nombre: 'Nuevo', seleccionado: false },
                            { id: 18, nombre: 'Ver', seleccionado: false },
                            { id: null, nombre: 'Editar', seleccionado: false },
                            {
                                id: null,
                                nombre: 'Eliminar',
                                seleccionado: false,
                            },
                            {
                                id: 21,
                                nombre: 'ÁREAS',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 22,
                                        nombre: 'Nuevo',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 23,
                                        nombre: 'Ver',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 24,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 25,
                                        nombre: 'Eliminar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 26,
                                        nombre: 'PUESTOS Y PERFILES',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 27,
                                                nombre: 'Nuevo',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 28,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 29,
                                                nombre: 'Editar',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 30,
                                                nombre: 'Eliminar',
                                                seleccionado: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                ],
                                isExpanded: false,
                            },
                        ],
                        isExpanded: false,
                    },
                    {
                        id: 95,
                        nombre: 'Banco de CV',
                        seleccionado: false,
                        hijos: [
                            { id: 96, nombre: 'Nuevo', seleccionado: false },
                            { id: 97, nombre: 'Ver', seleccionado: false },
                            { id: 98, nombre: 'Editar', seleccionado: false },
                            { id: 99, nombre: 'Eliminar', seleccionado: false },
                        ],
                        isExpanded: false,
                    },
                    {
                        id: 100,
                        nombre: 'Bolsa de Trabajo',
                        seleccionado: false,
                        hijos: [
                            { id: 101, nombre: 'Nuevo', seleccionado: false },
                            { id: 102, nombre: 'Ver', seleccionado: false },
                            { id: 103, nombre: 'Editar', seleccionado: false },
                            {
                                id: 104,
                                nombre: 'Eliminar',
                                seleccionado: false,
                            },
                        ],
                        isExpanded: false,
                    },
                ],
                isExpanded: false,
            },
            AulaVirtual: {
                nombre: 'AULA VIRTUAL',
                id: null,
                seleccionado: false,
                permisos: [
                    {
                        id: null,
                        nombre: 'MANTENIMIENTOS',
                        seleccionado: false,
                        hijos: [],
                        isExpanded: false,
                    },
                    {
                        id: null,
                        nombre: 'CARRERAS TÉCNICAS',
                        seleccionado: false,
                        hijos: [
                            { id: 33, nombre: 'Nuevo', seleccionado: false },
                            { id: 34, nombre: 'Editar', seleccionado: false },
                            { id: 35, nombre: 'Ver', seleccionado: false },
                            { id: 36, nombre: 'Eliminar', seleccionado: false },
                            {
                                id: 37,
                                nombre: 'CURSO',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 38,
                                        nombre: 'Nuevo',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 39,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 40,
                                        nombre: 'Ver',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 41,
                                        nombre: 'Eliminar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 42,
                                        nombre: 'SYLLABUS',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 43,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                    {
                                        id: 44,
                                        nombre: 'ALUMNOS',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 45,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 46,
                                                nombre: 'Asignar',
                                                seleccionado: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                    {
                                        id: 47,
                                        nombre: 'HORARIOS',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 48,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 49,
                                                nombre: 'Programar',
                                                seleccionado: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                    {
                                        id: 50,
                                        nombre: 'ASISTENCIA',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 51,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 52,
                                                nombre: 'Programar',
                                                seleccionado: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                    {
                                        id: 53,
                                        nombre: 'TEMAS',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 54,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                    {
                                        id: 55,
                                        nombre: 'GRUPOS DE EVALUACIONES',
                                        seleccionado: false,
                                        hijos: [
                                            {
                                                id: 56,
                                                nombre: 'Nuevo',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 57,
                                                nombre: 'Editar',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 58,
                                                nombre: 'Ver',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 59,
                                                nombre: 'Eliminar',
                                                seleccionado: false,
                                            },
                                            {
                                                id: 60,
                                                nombre: 'EVALUACIONES DE GRUPO',
                                                seleccionado: false,
                                                hijos: [
                                                    {
                                                        id: 61,
                                                        nombre: 'Nuevo',
                                                        seleccionado: false,
                                                    },
                                                    {
                                                        id: 62,
                                                        nombre: 'Editar',
                                                        seleccionado: false,
                                                    },
                                                    {
                                                        id: 63,
                                                        nombre: 'Ver',
                                                        seleccionado: false,
                                                    },
                                                    {
                                                        id: 64,
                                                        nombre: 'Eliminar',
                                                        seleccionado: false,
                                                    },
                                                    {
                                                        id: 65,
                                                        nombre: 'PREGUNTAS',
                                                        seleccionado: false,
                                                        hijos: [
                                                            {
                                                                id: 66,
                                                                nombre: 'Nuevo',
                                                                seleccionado:
                                                                    false,
                                                            },
                                                            {
                                                                id: 67,
                                                                nombre: 'Editar',
                                                                seleccionado:
                                                                    false,
                                                            },
                                                            {
                                                                id: 68,
                                                                nombre: 'Ver',
                                                                seleccionado:
                                                                    false,
                                                            },
                                                            {
                                                                id: 69,
                                                                nombre: 'Eliminar',
                                                                seleccionado:
                                                                    false,
                                                            },
                                                        ],
                                                        isExpanded: false,
                                                    },
                                                ],
                                                isExpanded: false,
                                            },
                                        ],
                                        isExpanded: false,
                                    },
                                ],
                                isExpanded: false,
                            },
                        ],
                        isExpanded: false,
                    },
                    {
                        id: null,
                        nombre: 'ALUMNOS',
                        seleccionado: false,
                        hijos: [
                            {
                                id: null,
                                nombre: 'Datos Personales',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 72,
                                        nombre: 'Nuevo',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 73,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 74,
                                        nombre: 'Ver',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 75,
                                        nombre: 'Eliminar',
                                        seleccionado: false,
                                    },
                                ],
                            },
                            {
                                id: 76,
                                nombre: 'Documentos de Gestión',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 77,
                                        nombre: 'Nuevo',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 78,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 79,
                                        nombre: 'Ver',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 80,
                                        nombre: 'Eliminar',
                                        seleccionado: false,
                                    },
                                ],
                            },
                            {
                                id: 81,
                                nombre: 'Avance Curricular',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 82,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 83,
                                        nombre: 'Ver',
                                        seleccionado: false,
                                    },
                                ],
                            },
                            { id: 84, nombre: 'Cursos', seleccionado: false },
                            { id: 85, nombre: 'Horarios', seleccionado: false },
                        ],
                        isExpanded: false,
                    },
                    {
                        id: null,
                        nombre: 'DOCENTES',
                        seleccionado: false,
                        hijos: [
                            {
                                id: null,
                                nombre: 'Datos Personales',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 88,
                                        nombre: 'Nuevo',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 89,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 90,
                                        nombre: 'Ver',
                                        seleccionado: false,
                                    },
                                    {
                                        id: 91,
                                        nombre: 'Eliminar',
                                        seleccionado: false,
                                    },
                                ],
                            },
                            {
                                id: 92,
                                nombre: 'Horarios',
                                seleccionado: false,
                                hijos: [
                                    {
                                        id: 93,
                                        nombre: 'Editar',
                                        seleccionado: false,
                                    },
                                ],
                            },
                            { id: 94, nombre: 'Cursos', seleccionado: false },
                        ],
                        isExpanded: false,
                    },
                    {
                        id: null,
                        nombre: 'CAPACITACIONES',
                        seleccionado: false,
                        hijos: [
                            { id: 33, nombre: 'Nuevo', seleccionado: false },
                            { id: 34, nombre: 'Editar', seleccionado: false },
                            { id: 35, nombre: 'Ver', seleccionado: false },
                            { id: 36, nombre: 'Eliminar', seleccionado: false },
                        ],
                        isExpanded: false,
                    },
                ],
                isExpanded: false,
            },
            Proyectos: {
                nombre: 'PROYECTOS',
                id: null,
                seleccionado: false,
                permisos: [
                    {
                        id: 23,
                        nombre: 'NUEVO',
                        seleccionado: false,
                        hijos: [],
                        isExpanded: false,
                    },
                    {
                        id: 22,
                        nombre: 'EDITAR',
                        seleccionado: false,
                        hijos: [],
                        isExpanded: false,
                    },
                    {
                        id: 21,
                        nombre: 'VER',
                        seleccionado: false,
                        hijos: [],
                        isExpanded: false,
                    },
                    {
                        id: 24,
                        nombre: 'ELIMINAR',
                        seleccionado: false,
                        hijos: [],
                        isExpanded: false,
                    }
                ],
                isExpanded: false,
            },
        };

        this.permisos.forEach((permiso) => {
            switch (permiso.nombre) {
                case 'ver_modulo_seguridad':
                    grupos['Seguridad'].id = permiso.id;
                    grupos['Seguridad'].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'ver_seguridad_configuracion':
                    grupos['Seguridad'].permisos[0].id = permiso.id;
                    grupos['Seguridad'].permisos[0].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'roles_crearRol':
                    grupos['Seguridad'].permisos[1].permisosInternos[0].id =
                        permiso.id;
                    grupos[
                        'Seguridad'
                    ].permisos[1].permisosInternos[0].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'roles_editarRol':
                    grupos['Seguridad'].permisos[1].permisosInternos[1].id =
                        permiso.id;
                    grupos[
                        'Seguridad'
                    ].permisos[1].permisosInternos[1].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'roles_eliminarRol':
                    grupos['Seguridad'].permisos[1].permisosInternos[2].id =
                        permiso.id;
                    grupos[
                        'Seguridad'
                    ].permisos[1].permisosInternos[2].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'roles_asignarPermiso':
                    grupos['Seguridad'].permisos[1].permisosInternos[3].id =
                        permiso.id;
                    grupos[
                        'Seguridad'
                    ].permisos[1].permisosInternos[3].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'ver_seguridad_roles':
                    grupos['Seguridad'].permisos[1].permisosInternos[4].id =
                        permiso.id;
                    grupos[
                        'Seguridad'
                    ].permisos[1].permisosInternos[4].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'aula_virtual_alumno':
                    grupos['AulaVirtual'].permisos[2].id = permiso.id;
                    grupos['AulaVirtual'].permisos[2].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'aula_virtual_mantenimientos':
                    grupos['AulaVirtual'].permisos[0].id = permiso.id;
                    grupos['AulaVirtual'].permisos[0].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'aula_virtual_capacitaciones':
                    grupos['AulaVirtual'].permisos[4].id = permiso.id;
                    grupos['AulaVirtual'].permisos[4].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'ver_modulo_estructura_organica':
                    grupos['EstructuraOrganica'].id = permiso.id;
                    grupos['EstructuraOrganica'].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'aula_virtual_docente_datos_personales':
                    grupos['AulaVirtual'].permisos[3].hijos[0].id = permiso.id;
                    grupos['AulaVirtual'].permisos[3].hijos[0].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'ver_modulo_aulaVirtual':
                    grupos['AulaVirtual'].id = permiso.id;
                    grupos['AulaVirtual'].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'aula_virtual_carreras':
                    grupos['AulaVirtual'].permisos[1].id = permiso.id;
                    grupos['AulaVirtual'].permisos[1].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'aula_virtual_alumno_datos_personales':
                    grupos['AulaVirtual'].permisos[2].hijos[0].id = permiso.id;
                    grupos['AulaVirtual'].permisos[2].hijos[0].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'aula_virtual_docente':
                    grupos['AulaVirtual'].permisos[3].id = permiso.id;
                    grupos['AulaVirtual'].permisos[3].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;

                case 'nuevo_modulo_proyecto':
                    grupos['Proyectos'].permisos[0].id = permiso.id;
                    grupos['Proyectos'].permisos[0].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'editar_modulo_proyecto':
                    grupos['Proyectos'].permisos[1].id = permiso.id;
                    grupos['Proyectos'].permisos[1].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'ver_modulo_proyecto':
                    grupos['Proyectos'].permisos[2].id = permiso.id;
                    grupos['Proyectos'].permisos[2].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
                case 'eliminar_modulo_proyecto':
                    console.log('pj2: ', grupos['Proyectos'])
                    grupos['Proyectos'].permisos[3].id = permiso.id;
                    grupos['Proyectos'].permisos[3].seleccionado =
                        this.permisosSeleccionados.has(permiso.id);
                    break;
            }
        });

        this.permisosAgrupados = Object.values(grupos);

        this.propagateSelection(this.permisosAgrupados);
        this.permisosAgrupados.forEach((grupo) => {
            this.verificarSeleccionGrupo(grupo);
        });
    }

    propagateSelection(permisos: Permiso[]) {
        permisos.forEach((permiso: Permiso) => {
            if (
                permiso.seleccionado &&
                permiso.hijos &&
                permiso.hijos.length > 0
            ) {
                this.togglePermisoSeleccion(permiso, true);
            }

            if (permiso.hijos && permiso.hijos.length > 0) {
                this.propagateSelection(permiso.hijos);
            }
        });
    }

    closeDialog() {
        this.visible = false;
    }

    closeModal() {
        this.ref.close({ register: false });
    }
}
