import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { OptionsDto } from '../seguridad/options-dto';
import { SeguridadService } from '../seguridad/service/seguridad.service';
import { Router, RouterLink } from '@angular/router';
import { PL_TOKEN, VAR_URL } from '../components/onlineclasses/utils/Utils';
import { style } from '@angular/animations';
import { GeneralService } from '../components/onlineclasses/service/general.service';
import { tap } from 'rxjs';
import { HelpersService } from '../helpers.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    optionsDtos: OptionsDto[] = [];
    model0: any[] = [];
    model1: any[] = [];
    model2: any[] = [];
    model3: any[] = [];
    model4: any[] = [];
    model5: any[] = [];
    model6: any[] = [];
    model7: any[] = [];
    model8: any[] = [];
    model9: any[] = [];
    menuOpciones: any[] = [];
    authUser: any;
    elementosOcultos: any[] = [];
    lstOpciones: any[] = [];
    permisos: any[] = [];
    domain_id: any;

    constructor(
        public seguridadService: SeguridadService,
        private router: Router,
        private permisoService: GeneralService,
        private helpersService: HelpersService
    ) {}

    ngOnInit() {
        const isUserLogged = this.helpersService.checkIsUserLogged();
        if (!isUserLogged) {
            this.router.navigate(['/auth/login']);
            return;
        }

        this.domain_id = this.helpersService.getDominioId();
        const rolId = this.helpersService.getRolId();

        // Imprime el rolId en la consola
        console.log('RolId obtenido:', rolId);

        // Verifica si el rol es "Alumno"
        if (rolId === 12) {
            console.log(
                'Rol Alumno detectado. Actualizando menú para Alumno...'
            );
            this.actualizarMenuAlumno();
        }
        // Verifica si el rol es "Docente"
        else if (rolId === 17) {
            console.log(
                'Rol Docente detectado. Actualizando menú para Docente...'
            );
            this.actualizarMenuDocente();
        } else if (rolId === 21) {
            console.log(
                'Rol Postulante detectado. Actualizando menú para Docente...'
            );
            this.actualizarMenuPostulante();
        } else if (rolId === 25) {
            console.log(
                'Rol Candidato detectado. Actualizando menú para Docente...'
            );
            this.actualizarMenuCandidato();
        } else {
            this.permisoService.fetchPermisos(rolId, this.domain_id);
            this.permisoService.permisos$
                .pipe(
                    tap((permisos) => {
                        this.permisos = permisos;
                        this.actualizarMenu();
                    })
                )
                .subscribe();
        }
    }

    actualizarMenuDocente() {
        console.log('actualizarMenuDocente llamado');
        this.model4 = [
            {
                items: [
                    {
                        label: 'AULA VIRTUAL',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Docente',
                                icon: 'pi pi-users',
                                items: [
                                    {
                                        label: 'Horario',
                                        icon: 'pi pi-fw pi-calendar',
                                        routerLink: [
                                            '/pl-virtual/horario-docente',
                                        ],
                                    },
                                    {
                                        label: 'Unidad Didactica',
                                        icon: 'pi pi-share-alt',
                                        routerLink: [
                                            '/pl-virtual/cursos-docente',
                                        ],
                                    },
                                    {
                                        label: 'Datos personales',
                                        icon: 'pi pi-file-edit',
                                        routerLink: [
                                            '/pl-virtual/bandeja-docente',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];

        // Elimina CAPACITACIONES
        this.model4 = this.model4.filter(
            (item) => item.label !== 'CAPACITACIONES'
        );
    }
    actualizarMenuPostulante() {
        console.log('actualizarMenuPostulante llamado');
        this.model4 = [
            {
                items: [
                    {
                        label: 'ESTRUCTURA ORGANICA',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Banco CV',
                                icon: 'pi pi-play',
                                items: [
                                    {
                                        label: 'Datos personales',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/lista-postulantes',
                                        ],
                                    },
                                    {
                                        label: 'Informacion academica',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/informacion-academica',
                                        ],
                                    },
                                    {
                                        label: 'Experiencia Laboral',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/experiencia-laboral',
                                        ],
                                    },
                                    {
                                        label: 'Capacitaciones',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/capacitacion-postulante',
                                        ],
                                    },
                                    {
                                        label: 'Referencia familiares',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/referencias-familiares',
                                        ],
                                    },
                                    {
                                        label: 'Referencia laborales',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/referencias-laborales',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
    }
    actualizarMenuCandidato() {
        console.log('actualizarMenuCandidato llamado');
        this.model4 = [
            {
                items: [
                    {
                        label: 'AGENDA VIRTUAL',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Mantenimiento',
                                icon: 'pi pi-play',
                                items: [
                                    {
                                        label: 'Datos Personales del candidato',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/datos-personales-candidato',
                                        ],
                                    },
                                    {
                                        label: 'Informacion academica',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/informacion-academica-candidato',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
    }
    actualizarMenuAlumno() {
        console.log('actualizarMenuAlumno llamado');
        this.model4 = [
            {
                items: [
                    {
                        label: 'AULA VIRTUAL',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Alumno',
                                icon: 'pi pi-users',
                                items: [
                                    {
                                        label: 'Datos Personales',
                                        icon: 'pi pi-user-edit',
                                        routerLink: [
                                            '/pl-virtual/bandeja-alumno',
                                        ],
                                    },
                                    {
                                        label: 'Documentos de Gestión',
                                        icon: 'pi pi-file',
                                        routerLink: [
                                            '/pl-virtual/documentos-alumnos',
                                        ],
                                    },
                                    {
                                        label: 'Unidad Didactica',
                                        icon: 'pi pi-fw pi-calendar',
                                        routerLink: [
                                            '/pl-virtual/bandeja-curso',
                                        ],
                                    },
                                    {
                                        label: 'Horarios',
                                        icon: 'pi pi-fw pi-calendar',
                                        routerLink: ['/apps/calendar'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
    }

    actualizarMenu() {
        this.model0 = [
            {
                items: [
                    {
                        label: 'MULTI-EMPRESAS',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Empresas',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/pl-virtual/lista-empresas'],
                            },
                        ],
                    },
                ],
            },
        ];
        this.model1 = [
            {
                items: [
                    {
                        label: 'SEGURIDAD',
                        icon: 'pi pi-play',
                        items: [
                            ...(this.tienePermiso('ver_seguridad_configuracion')
                                ? [
                                      {
                                          label: 'Configuración',
                                          icon: 'pi pi-fw pi-building',
                                          routerLink: [
                                              '/pl-virtual/configuracion-institucion',
                                          ],
                                      },
                                  ]
                                : []),

                            ...(this.tienePermiso('ver_seguridad_roles')
                                ? [
                                      {
                                          label: 'Roles y permisos',
                                          icon: 'pi pi-fw pi-building',
                                          routerLink: [
                                              '/pl-virtual/lista-roles',
                                          ],
                                      },
                                  ]
                                : []),

                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/pl-virtual/bandeja-usuarios'],
                                permisos: 'ver_modulo_seguridad',
                            },
                        ],
                    },
                    {
                        label: 'AGENDA VIRTUAL',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Candidatos',
                                icon: 'pi pi-users',
                                routerLink: ['/pl-virtual/lista-ciudades'],
                            }
                        ],
                    },
                ],
            },
        ];
        // this.model9 = [
        //     {
        //         items: [
        //             {
        //                 label: 'AGENDA VIRTUAL',
        //                 icon: 'pi pi-play',
        //                 items: [
        //                     {
        //                         label: 'Agenda',
        //                         icon: 'pi pi-fw pi-building',
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        // ];
        this.model2 = [
            {
                items: [
                    {
                        label: 'PORTAL WEB',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Configuración',
                                icon: 'pi pi-cog',
                            },
                        ],
                    },
                ],
            },
        ];

        this.model3 = [
            {
                items: [
                    {
                        label: 'ESTRUCTURA ORGANICA',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Banco CV',
                                icon: 'pi pi-play',
                                items: [
                                    {
                                        label: 'Egresados',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/lista-postulantes',
                                        ],
                                    },
                                ],
                            },
                            {
                                label: 'Instituciones',
                                icon: 'pi pi-play',
                                routerLink: ['/pl-virtual/lista-instituciones'],
                            },
                            {
                                label: 'Mantenimiento',
                                icon: 'pi pi-play',
                                items: [
                                    {
                                        label: 'Año',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/afiliado-partido',
                                        ],
                                    },
                                    {
                                        label: 'Gestiones',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/mantenimiento-gestiones',
                                        ],
                                    },
                                    {
                                        label: 'Grado de instruccion',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/grado-de-instruccion',
                                        ],
                                    },
                                    {
                                        label: 'Vinculos laborales',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/vinculos-laborales',
                                        ],
                                    },
                                    {
                                        label: 'Niveles de Puesto',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/nivel-de-puesto',
                                        ],
                                    },
                                    {
                                        label: 'Modalidad de Puesto',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/modalidad-de-puesto',
                                        ],
                                    },
                                    {
                                        label: 'Profesiones',
                                        icon: 'pi pi-users',
                                        routerLink: ['/pl-virtual/profesiones'],
                                    },
                                    {
                                        label: 'Estado de avance',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/estado-de-avance',
                                        ],
                                    },
                                    {
                                        label: 'Escala',
                                        icon: 'pi pi-users',
                                        routerLink: ['/pl-virtual/escala'],
                                    },
                                    {
                                        label: 'Ocupacion Actual',
                                        icon: 'pi pi-users',
                                        routerLink: [
                                            '/pl-virtual/ocupacion-actual',
                                        ],
                                    },
                                ],
                            },
                            {
                                label: 'Bolsa de trabajo',
                                icon: 'pi pi-play',
                                routerLink: ['/pl-virtual/bolsa-trabajo'],
                            },
                        ],
                    },
                ],
            },
        ];

        this.model4 = [
            {
                items: [
                    {
                        label: 'AULA VIRTUAL',
                        icon: 'pi pi-play',
                        items: [
                            // {
                            //     label: 'Configuración',
                            //     icon: 'pi pi-cog',
                            //     items: [
                            //         {
                            //             label: 'Instituciones',
                            //             icon: 'pi pi-building',
                            //             routerLink: ['/pl-virtual/registro-instituciones']
                            //         }
                            //     ]
                            //     // routerLink: ['/pl-virtual/bandeja-instituciones']
                            // },
                            // {
                            //     label: 'Roles',
                            //     icon: 'pi pi-users',
                            //     routerLink: ['/pl-virtual/bandeja-usuarios']
                            // },
                            {
                                label: 'Mantenimientos',
                                icon: 'pi pi-wrench',
                                items: [
                                    {
                                        label: 'Módulo',
                                        icon: 'pi pi-briefcase',
                                        routerLink: [
                                            '/pl-virtual/area-formacion',
                                        ],
                                    },
                                    {
                                        label: 'Competencia',
                                        icon: 'pi pi-credit-card',
                                        routerLink: [
                                            '/pl-virtual/modulos-formativos',
                                        ],
                                    },
                                    {
                                        label: 'Área de Promociones',
                                        icon: 'pi pi-credit-card',
                                        routerLink: [
                                            '/pl-virtual/area-promociones',
                                        ],
                                    },
                                    {
                                        label: 'Estados',
                                        icon: 'pi pi-envelope',
                                        routerLink: ['/pl-virtual/estados'],
                                    },
                                    {
                                        label: 'Plan de Estudio',
                                        icon: 'pi pi-id-card',
                                        routerLink: [
                                            '/pl-virtual/estado-cursos',
                                        ],
                                    },
                                    {
                                        label: 'Ciclos',
                                        icon: 'pi pi-inbox',
                                        routerLink: ['/pl-virtual/ciclos'],
                                    },
                                    {
                                        label: 'Aulas',
                                        icon: 'pi pi-wrench',
                                        routerLink: ['/pl-virtual/aulas'],
                                    },
                                ],
                            },

                            //     ]
                            // },
                            this.tienePermiso('aula_virtual_carreras')
                                ? {
                                      label: 'Carreras técnicas',
                                      icon: 'pi pi-book',
                                      routerLink: [
                                          '/pl-virtual/bandeja-carrtecnicas',
                                      ],
                                  }
                                : null,
                            this.tienePermiso('aula_virtual_alumno')
                                ? {
                                      label: 'Alumno',
                                      icon: 'pi pi-users',
                                      items: [
                                          /*{
                                        label: 'Bandeja',
                                        icon: 'pi pi-bars',
                                        routerLink: ['/pl-virtual/bandeja-alumno']

                                    },*/
                                          this.tienePermiso(
                                              'aula_virtual_alumno_datos_personales'
                                          )
                                              ? {
                                                    label: 'Datos Personales',
                                                    icon: 'pi pi-user-edit',
                                                    routerLink: [
                                                        '/pl-virtual/bandeja-alumno',
                                                    ],
                                                }
                                              : null,
                                          {
                                              label: 'Documentos de Gestión',
                                              icon: 'pi pi-file',
                                              routerLink: [
                                                  '/pl-virtual/documentos-alumnos',
                                              ],
                                          },
                                          //   {
                                          //       label: 'Avance Curricular',
                                          //       icon: 'pi pi-sitemap',
                                          //       routerLink: [
                                          //           '/pl-virtual/avance-curricular',
                                          //       ],
                                          //   },
                                          {
                                              label: 'Unidad Didactica',
                                              icon: 'pi pi-fw pi-calendar',
                                              routerLink: [
                                                  '/pl-virtual/bandeja-curso',
                                              ],
                                          },

                                          /* {
                                         label: 'Practicas',
                                         icon: 'pi pi-fw pi-folder',
                                         routerLink: ['']
                                     },*/
                                          {
                                              label: 'Horarios',
                                              icon: 'pi pi-fw pi-calendar',
                                              routerLink: ['/apps/calendar'],
                                          },

                                          // {
                                          //     label: 'Foros',
                                          //     icon: 'pi pi-comment',
                                          //     routerLink: ['/pl-virtual/foro-alumnos']
                                          // },
                                          // {
                                          //     label: 'Record de pago',
                                          //     icon: 'pi pi-money-bill',
                                          //     routerLink: ['']
                                          // },
                                          // {
                                          //     label: 'Otros cursos',
                                          //     icon: 'pi pi-shopping-bag',
                                          //     routerLink: ['']
                                          // },
                                          // {
                                          //     label: 'Capacitaciones',
                                          //     icon: 'pi pi-sun',
                                          //     routerLink: ['']
                                          // },
                                      ].filter((item) => item !== null),
                                  }
                                : null,

                            this.tienePermiso('aula_virtual_docente')
                                ? {
                                      label: 'Docente',
                                      icon: 'pi pi-fw pi-briefcase',
                                      items: [
                                          this.tienePermiso(
                                              'aula_virtual_docente_datos_personales'
                                          )
                                              ? {
                                                    label: 'Datos personales',
                                                    icon: 'pi pi-file-edit',
                                                    routerLink: [
                                                        '/pl-virtual/bandeja-docente',
                                                    ],
                                                    // routerLink: ['/pl-virtual/']
                                                }
                                              : null,
                                          {
                                              label: 'Horario',
                                              icon: 'pi pi-fw pi-calendar',
                                              // routerLink: ['/pl-virtual/cursos-docente']
                                              routerLink: [
                                                  '/pl-virtual/horario-docente',
                                              ],
                                          },
                                          {
                                              label: 'Unidad Didactica',
                                              icon: 'pi pi-share-alt',
                                              // routerLink: ['/pl-virtual/cursos-docente']
                                              routerLink: [
                                                  '/pl-virtual/cursos-docente',
                                              ],
                                          },
                                          // {
                                          //     label: 'Evaluaciones',
                                          //     icon: 'pi pi-fw pi-calendar',
                                          //     // routerLink: ['/pl-virtual/evaluacion-docente']
                                          //     routerLink: ['/pl-virtual/']

                                          // },
                                          // {
                                          //     label: 'Foros',
                                          //     icon: 'pi pi-comment',
                                          //     routerLink: ['/']

                                          // },
                                          {
                                              label: 'Asistencia',
                                              icon: 'pi pi-users',
                                              routerLink: ['/'],
                                          },
                                      ].filter((item) => item !== null),
                                  }
                                : null,

                            {
                                label: 'CAPACITACIONES',
                                icon: 'pi pi-users',
                                routerLink: ['/pl-virtual/capacitaciones'],
                            },
                        ].filter((item) => item !== null),
                    },
                ].filter((item) => item !== null),
            },
        ];

        this.model5 = [
            {
                items: [
                    {
                        label: 'AGENDA VIRTUAL',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Agenda',
                                icon: 'pi pi-fw pi-building',
                            },
                        ],
                    },
                ],
            },
        ];

        this.model6 = [
            {
                items: [
                    {
                        label: 'EJECUCION PROYECTOS',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Ejecucion',
                                icon: 'pi pi-cog',
                            },
                        ],
                    },
                ],
            },
        ];

        this.model7 = [
            {
                items: [
                    {
                        label: 'GESTION INCIDENCIAS',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Incidencias',
                                icon: 'pi pi-fw pi-building',
                            },
                        ],
                    },
                ],
            },
        ];

        this.model8 = [
            {
                items: [
                    {
                        label: 'PROYECTOS',
                        icon: 'pi pi-play',
                        items: [
                            {
                                label: 'Proyectos',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/pl-virtual/proyectos'],
                            },
                        ],
                    },
                ],
            },
        ];
    }

    tienePermiso(nombrePermiso: string): boolean {
        return this.permisoService.tienePermiso(nombrePermiso);
    }

    private configuracionInicial(): void {
        if (
            window.location.href.includes(VAR_URL) &&
            (localStorage.getItem(PL_TOKEN) === 'invalid' ||
                localStorage.getItem(PL_TOKEN))
        ) {
            let loadUser = decodeURIComponent(
                window.location.href.split('?')[1]
            );
            this.seguridadService.LoadUser(loadUser).subscribe({
                next: (modelResponse: any) => {
                    console.log('modelResponse', modelResponse);
                    this.lstOpciones.push(modelResponse.data.options);
                    localStorage.setItem(PL_TOKEN, loadUser);
                    localStorage.setItem(
                        'consejo-idPersona',
                        modelResponse.data.idPersona
                    );
                    localStorage.setItem(
                        'consejo-correo',
                        modelResponse.data.correo
                    );
                    localStorage.setItem(
                        'consejo-name',
                        modelResponse.data.name
                    );
                    localStorage.setItem(
                        'consejo-username',
                        modelResponse.data.username
                    );
                    localStorage.setItem(
                        'consejo-perfil',
                        modelResponse.data.perfil
                    );
                    localStorage.setItem(
                        'consejo-opciones',
                        JSON.stringify(modelResponse.data.options)
                    );
                },
                error: (errorResponse: any) => {
                    console.log(
                        'LoadUser:observable subscribe error',
                        errorResponse
                    );
                },
                complete: () => {
                    this.router.navigate(['/consejo-directivo']);
                },
            });
        }
    }
}
