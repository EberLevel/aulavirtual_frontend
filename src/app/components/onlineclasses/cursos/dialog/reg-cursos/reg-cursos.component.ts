import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
import { CommonService } from '../../../service/common.service';
import { Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    horasPracticas: number = 0;
    syllabus: string | undefined = '';
    tema: string | undefined = '';
    asignacionDocentes: any = {};
    asignacionesDocentes: any[] = [];
    estados: any[] = [];
    estado: any = {};
    acciones: string = '';
    domain_id = 1;
    loading: boolean = true;
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
            this.idCurso = this.config.data.data.id; // ID del curso
        }

        this.cantidadTotalCreditos = this.config.data.total_creditos;
        this.acciones = this.config.data.acciones;
        this.domain_id = this.helperService.getDominioId();
        this.loading = true;
        // Carga todas las listas necesarias en paralelo
        Promise.all([
            this.getAllCarrerasDropdown(this.domain_id),
            this.listarModulosFormativos(),
            this.listarAreasFormacion(),
            this.listarCiclos(),
            this.listarEstados(),
            this.listarDocentes(this.domain_id),
        ]).then(() => {
            if (
                this.acciones === 'editar' ||
                this.acciones === 'ver' ||
                this.acciones === 'duplicar'
            ) {
                // Una vez que todas las listas se cargaron, carga los datos del curso
                this.obtenerDatosCurso(this.idCurso).then(() => {
                    // Asigna los valores del curso al formulario
                    this.codigo = this.curso.codigo;
                    this.nombreCurso = this.curso.nombre;
                    this.ciclo = this.curso.ciclo_id;
                    this.areaFormacion = this.curso.area_de_formacion_id;
                    this.moduloFormativo = this.curso.modulo_formativo_id;
                    this.cantidadCreditos = this.curso.cantidad_de_creditos;
                    this.porcentajeCreditos = this.curso.porcentaje_de_creditos;
                    this.cantidadHoras = this.curso.cantidad_de_horas;
                    this.horasPracticas = this.curso.horas_practicas;
                    this.syllabus = this.curso.syllabus;
                    this.tema = this.curso.tema;
                    this.asignacionDocentes = this.curso.docente_id;
                    this.estado = this.curso.estado_id;

                    // Asigna la carrera seleccionada al dropdown
                    this.carreraSeleccionada = this.carrerasList.find(
                        (carrera) => carrera.value === this.curso.carrera_id
                    );

                    if (this.acciones === 'duplicar') {
                        this.getCarrerasDropdown(this.estado);
                    }
                });
            } else {
                // En el modo de agregar, inicializa las variables necesarias
                this.codigo = '';
                this.nombreCurso = '';
                this.ciclo = {};
                this.areaFormacion = {};
                this.moduloFormativo = {};
                this.cantidadCreditos = 0;
                this.porcentajeCreditos = 0;
                this.cantidadHoras = 0;
                this.horasPracticas = 0;
                this.syllabus = '';
                this.tema = '';
                this.asignacionDocentes = {};
                this.carrera_id = null;
                this.estado = null;
            }
            this.loading = false;
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
            horasPracticas: this.horasPracticas,
            syllabus: this.syllabus,
            tema: this.tema,
            asignacionDocentesId: this.asignacionDocentes,
            carreraId: this.carreraSeleccionada?.value,
            estadoId: this.estado,
            domain_id: this.domain_id,
        };
        console.log('Datos enviados al backend (curso):', curso);

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

    onCarreraChange(event: any): void {
        console.log('Carrera seleccionada:', this.carreraSeleccionada);
    }

    // Función para obtener las carreras filtradas por el Plan de Estudio
    getAllCarrerasDropdown(domain_id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.commonService.getCarrerasDropdown(domain_id).subscribe(
                (response: any[]) => {
                    this.carrerasList = response.map((carrera) => ({
                        name: carrera.nombres, // Texto visible en el dropdown
                        value: carrera.id, // Valor único de la carrera
                    }));
                    console.log('Carreras cargadas:', this.carrerasList);
                    resolve(); // Resuelve la promesa cuando los datos se cargan correctamente
                },
                (error) => {
                    console.error('Error al listar carreras:', error);
                    reject(error); // Rechaza la promesa en caso de error
                }
            );
        });
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
            horasPracticas: this.horasPracticas,
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
            horasPracticas: this.horasPracticas,
            syllabus: this.syllabus,
            tema: this.tema,
            asignacionDocentesId: this.asignacionDocentes,
            carreraId: this.carreraSeleccionada.value,
            estadoId: this.estado,
            cursoId: this.config.data.data.id,
            domain_id: this.domain_id,
        };

        console.log('Curso a actualizar', curso);

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
                    console.error('Error al actualizar el curso', error);
                }
            );
        } else {
            console.error('Formulario inválido');
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
