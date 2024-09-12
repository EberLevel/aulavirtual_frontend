import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
import { CommonService } from '../../../service/common.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-reg-cursos',
    templateUrl: './reg-cursos.component.html',
    styleUrls: ['./reg-cursos.component.scss'],
})
export class RegCursosComponent implements OnInit, AfterViewInit {
    id: number = 0;
    cantidadTotalCreditos: number = 0;
    codigo: string = '';
    nombreCurso: string = '';
    ciclo: any = {};
    ciclos: any[] = [];
    areaFormacion: any = {};
    areasFormacion: any[] = [];
    moduloFormativo: any = {};
    modulosFormativos: any[] = [];
    cantidadCreditos: number = 0;
    porcentajeCreditos: number = 0;
    cantidadHoras: number = 0;
    syllabus: string | undefined = '';
    tema: string | undefined = '';
    asignacionDocentes: any = {};
    asignacionesDocentes: any[] = [];
    estados: any[] = [];
    estado: any = {};
    acciones: string = '';
    domain_id = 1;

    subscriptions: Subscription[] = [];
    curso: any = {};
    carrera_id: any;
    idCurso: any;
    carreraSeleccionada: any = {}; // Almacenar la carrera seleccionada
    carrerasList: any[] = [];
    constructor(
        public ref: DynamicDialogRef,
        private parametroService: GeneralService,
        public config: DynamicDialogConfig,
        public helperService: HelpersService,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        if (this.config.data.acciones !== 'add') {
            this.idCurso = this.config.data.data.id; // ID Curso
        }

        this.cantidadTotalCreditos = this.config.data.total_creditos;
        this.acciones = this.config.data.acciones;
        this.domain_id = this.helperService.getDominioId();
        this.carrera_id = this.curso.carrera_id;
        // Carga de datos basada en la acción
        if (
            this.acciones === 'editar' ||
            this.acciones === 'ver' ||
            this.acciones === 'duplicar'
        ) {
            this.obtenerDatosCurso(this.idCurso).then(() => {
                this.codigo = this.curso.codigo;
                this.nombreCurso = this.curso.nombre;
                this.ciclo = this.curso.ciclo_id;
                this.areaFormacion = this.curso.area_de_formacion_id;
                this.moduloFormativo = this.curso.modulo_formativo_id;
                this.cantidadCreditos = this.curso.cantidad_de_creditos;
                this.porcentajeCreditos = this.curso.porcentaje_de_creditos;
                this.cantidadHoras = this.curso.cantidad_de_horas;
                this.syllabus = this.curso.syllabus;
                this.carrera_id = this.curso.carrera_id;
                //console.log("carrera_id" ,this.carrera_id)
                this.tema = this.curso.tema;
                this.asignacionDocentes = this.curso.docente_id;
                this.estado = this.curso.estado_id;

                if (this.acciones === 'duplicar') {
                    this.getCarrerasDropdown(this.estado);
                }
            });
        } else {
            // En el modo de agregar, inicializa las variables necesarias sin necesidad de cargar un curso existente
            this.codigo = '';
            this.nombreCurso = '';
            this.ciclo = {};
            this.areaFormacion = {};
            this.moduloFormativo = {};
            this.cantidadCreditos = 0;
            this.porcentajeCreditos = 0;
            this.cantidadHoras = 0;
            this.syllabus = '';
            this.tema = '';
            this.asignacionDocentes = {};
            this.carrera_id = null;
            this.estado = null;
        }

        // Cargar listas independientes de la acción
        Promise.all([
            this.listarModulosFormativos(),
            this.listarAreasFormacion(),
            this.listarCiclos(),
            this.listarEstados(),
            this.listarDocentes(this.domain_id),
        ]).then(() => {
            //console.log('Datos cargados para el formulario de curso.');
        });
    }

    ngAfterViewInit(): void {}

    GuardarCurso(): void {
        //console.log(this.asignacionDocentes);
        const curso = {
            codigo: this.codigo,
            nombreCurso: this.nombreCurso,
            cicloId: this.ciclo,
            areaFormacionId: this.areaFormacion,
            moduloFormativoId: this.moduloFormativo,
            cantidadCreditos: this.cantidadCreditos,
            porcentajeCreditos: this.porcentajeCreditos,
            cantidadHoras: this.cantidadHoras,
            syllabus: this.syllabus,
            tema: this.tema,
            asignacionDocentesId: this.asignacionDocentes,
            carreraId: this.config.data.id,
            estadoId: this.estado,
            domain_id: this.domain_id,
        };
        console.log("curso",curso)

        if (curso) {
            this.parametroService.guardarCurso(curso).subscribe(
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
                    //console.error('Error al guardar el parametro', error);
                }
            );
        } else {
            //console.error('Formulario inválido');
        }
    }

    // Función para obtener las carreras filtradas por el Plan de Estudio
    getCarrerasDropdown(planDeEstudioId: number) {
        this.commonService
            .getCarrerasDropdownByPlanDeEstudio(planDeEstudioId)
            .subscribe(
                (response) => {
                    this.carrerasList = response.map((carrera: any) => {
                        return {
                            name: carrera.nombres,
                            value: carrera.id,
                        };
                    });
                },
                (error) => {
                    //console.error('Error obteniendo carreras', error);
                }
            );
    }

    onPlanDeEstudioChange(event: any) {
        const planDeEstudioId = event.value;

        // Limpia la carrera seleccionada si cambias el plan de estudios
        this.carreraSeleccionada = null;
        this.carrerasList = []; // Limpia las carreras actuales antes de cargar las nuevas

        // Llama al método para obtener las carreras basadas en el nuevo plan de estudios
        if (planDeEstudioId) {
            this.getCarrerasDropdown(planDeEstudioId);
        }
    }

    GuardarCursoDuplicado(): void {
        //console.log('Carrera seleccionada antes de guardar:', this.carreraSeleccionada);

        const cursoDuplicado = {
            id: undefined,
            codigo: this.codigo,
            nombreCurso: this.nombreCurso,
            cicloId: this.ciclo,
            areaFormacionId: this.areaFormacion,
            moduloFormativoId: this.moduloFormativo,
            cantidadCreditos: this.cantidadCreditos,
            porcentajeCreditos: this.porcentajeCreditos,
            cantidadHoras: this.cantidadHoras,
            syllabus: this.syllabus,
            tema: this.tema,
            asignacionDocentesId: this.asignacionDocentes,
            carreraId: this.carreraSeleccionada,
            estadoId: this.estado,
            domain_id: this.domain_id,
        };

        //console.log('Datos del curso duplicado a guardar:', cursoDuplicado);

        if (cursoDuplicado) {
            this.parametroService.guardarCurso(cursoDuplicado).subscribe(
                (response: any) => {
                    this.closeModal();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'El curso duplicado se guardó correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    }).then(() => {});
                },
                (error: any) => {
                    //console.error('Error al guardar el curso duplicado', error);
                }
            );
        } else {
            //console.error('Formulario inválido');
        }
    }

    editarCurso(): void {
        const curso = {
            codigo: this.codigo,
            nombreCurso: this.nombreCurso,
            cicloId: this.ciclo,
            areaFormacionId: this.areaFormacion,
            moduloFormativoId: this.moduloFormativo,
            cantidadCreditos: this.cantidadCreditos,
            porcentajeCreditos: this.porcentajeCreditos,
            cantidadHoras: this.cantidadHoras,
            syllabus: this.syllabus,
            tema: this.tema,
            asignacionDocentesId: this.asignacionDocentes?.code,
            carreraId: this.carrera_id,
            estadoId: this.estado,
            cursoId: this.config.data.data.id,
            domain_id: this.domain_id,
        };

        //console.log('Curso a guardar', curso);

        if (curso) {
            this.parametroService.actualizarCurso(curso).subscribe(
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
                    //console.error('Error al guardar el parametro', error);
                }
            );
        } else {
            //console.error('Formulario inválido');
        }
    }

    onCantidadCreditosChange(newValue: number) {
        if (
            this.cantidadTotalCreditos === 0 ||
            this.cantidadTotalCreditos == null
        ) {
            this.porcentajeCreditos = 100;
        } else {
            //console.log('Cantidad de créditos ha cambiado:', newValue);
            //console.log(                'Cantidad total de créditos:'                this.cantidadTotalCreditos            );
            const resultado = (newValue / this.cantidadTotalCreditos) * 100;
            this.porcentajeCreditos = resultado;
            //console.log('Resultado del cálculo:', resultado);
        }
    }

    obtenerDatosCurso(id: number): Promise<void> {
        //console.log('Id curso:', id);
        return new Promise((resolve, reject) => {
            this.parametroService.getCursoById(id).subscribe(
                (response: any) => {
                    //console.log('Datos Curso', response.Datos);
                    this.curso = response.Datos;
                    //this.modulosFormativos = response;
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }

    listarModulosFormativos(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getModulosFormativos().subscribe(
                (response: any) => {
                    this.modulosFormativos = response;
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }

    listarAreasFormacion(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getAreasDeFormacion().subscribe(
                (response: any) => {
                    this.areasFormacion = response;
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }

    listarCiclos(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getCiclos().subscribe(
                (response: any) => {
                    this.ciclos = response;
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }

    listarEstados(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getEstadoDeCurso().subscribe(
                (response: any) => {
                    //console.log('Lista de listarEstados', response);
                    this.estados = response;
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }
    listarDocentes(domain_id: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.commonService.getDocentesDropdown(this.domain_id).subscribe(
                (response: any) => {
                    this.asignacionesDocentes = response.map((item: any) => {
                        return {
                            label: item.nombres,
                            value: item.id,
                        };
                    });
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }

    closeModal() {
        this.ref.close({ register: false });
    }

    syllabusChange(event: any): void {
        //console.log(event);
    }
}
