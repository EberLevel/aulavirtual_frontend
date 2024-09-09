import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { Parametro } from '../../../interface/general';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { HelpersService } from 'src/app/helpers.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-responder-pregunta',
    templateUrl: './responder-pregunta.component.html',
    styleUrls: ['./responder-pregunta.component.scss'],
})
export class ResponderPreguntaComponent {
    loading: boolean = false;
    parametroDatos: Parametro = new Parametro();
    parametro: Parametro = new Parametro();
    mostrarCursos = false;
    idEvaluacion: any;
    acciones: any;
    tiposEvaluacion: any;
    estados: any;
    preguntaForm: FormGroup;
    tiposPregunta = [];
    sanitizePregunta: SafeHtml = '';
    preguntaDocenteValue: any;
    alumnoId: number | null = null;
    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private parametroService: GeneralService,
        private helpersService: HelpersService,
        private sanitizer: DomSanitizer,
        private spinner: NgxSpinnerService
    ) {
        this.spinner.show();
        this.loading = true;
        const user = localStorage.getItem('user');

        // Verificar si el objeto existe en el localStorage
        if (user) {
            // Parsear el objeto JSON
            const userObj = JSON.parse(user);

            // Acceder a la propiedad docente_id
            this.alumnoId = userObj.alumno_id || 1;
        } else {
            console.error('No se encontró el objeto user en el localStorage');
        }
        this.preguntaForm = this.fb.group({
            tipoPregunta: ['', Validators.required],
            valor_pregunta: ['', Validators.required],
            pregunta_docente: ['', Validators.required],
            alternativas: this.fb.array([]),
            respuesta_alumno: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        console.log(
            'ID de la evaluación recibido en el componente hijo: ',
            this.idEvaluacion
        );

        this.idEvaluacion = this.config.data.idEvaluacion;
        this.acciones = this.config.data.acciones;
        this.sanitizePregunta = this.sanitizer.bypassSecurityTrustHtml(
            this.config.data.data.pregunta_docente
        );
        this.preguntaDocenteValue = this.config.data.data.pregunta_docente; // Accede al valor real
        Promise.all([this.listarDePregunta()]).then(() => {
            if (
                this.acciones === 'ver' ||
                this.acciones === 'actualizar' ||
                this.acciones === 'alumno'
            ) {
                this.preguntaForm.patchValue({
                    tipoPregunta: this.config.data.data.tipo_de_evaluacion_id,
                    valor_pregunta: this.config.data.data.valor_pregunta,
                    pregunta_docente:
                        this.preguntaDocenteValue[
                            'changingThisBreaksApplicationSecurity'
                        ],
                    respuesta_alumno: null,
                });

                this.setAlternativasv2(this.config.data.data.alternativas);
            }
            this.loading = false;
        });
    }

    setAlternativasv2(alternativas: any[]): void {
        const alternativasFormArray = this.preguntaForm.get(
            'alternativas'
        ) as FormArray;
        alternativas.forEach((alternativa) => {
            alternativasFormArray.push(
                this.fb.group({
                    texto: [alternativa.texto, Validators.required],
                    respuesta_correcta_seleccionada: [
                        false,
                        Validators.required,
                    ],
                })
            );
        });
    }

    // Method to handle radio button change
    onRadioChange(selectedIndex: number): void {
        const alternativas = this.preguntaForm.get('alternativas') as FormArray;
        alternativas.controls.forEach((control, index) => {
            const respuestaCorrectaControl = control.get(
                'respuesta_correcta_seleccionada'
            );
            if (respuestaCorrectaControl) {
                respuestaCorrectaControl.setValue(index === selectedIndex);
            }
        });
    }
    listarDePregunta(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parametroService.getTipoDePregunta().subscribe(
                (response: any) => {
                    console.log('Lista de getTipoDePregunta', response);
                    this.tiposPregunta = response;
                    resolve();
                },
                (error: any) => reject(error)
            );
        });
    }

    setAlternativas(alternativas: any[]): void {
        const alternativasFGs = alternativas.map((alternativa) =>
            this.fb.group(alternativa)
        );
        const alternativasFormArray = this.fb.array(alternativasFGs);
        this.preguntaForm.setControl('alternativas', alternativasFormArray);
    }
    guardarRespuestaCorrecta() {
        const alternativas = this.preguntaForm.value.alternativas;
        const index = alternativas.findIndex(
            (alternativa: any) =>
                alternativa.respuesta_correcta_seleccionada === true
        );
        if (index !== -1) {
        }
    }

    setRespuestaAlumno(): void {
        const correctAnswerIndex =
            this.preguntaForm.value.alternativas.findIndex(
                (alternativa: any) =>
                    alternativa.respuesta_correcta_seleccionada === true
            ) + 1;
        this.preguntaForm.get('respuesta_alumno')?.setValue(correctAnswerIndex);
    }

    guardarPregunta() {
        console.log(this.preguntaForm);
        if (this.config.data.data.tipo_de_evaluacion_id === 66) {
            this.setRespuestaAlumno();
        }
        if (this.preguntaForm.valid) {
            const parametros = {
                alumno_id: this.alumnoId,
                pregunta_id: this.config.data.data.id,
                respuesta: this.preguntaForm.value.respuesta_alumno,
                evaluacion_id: this.idEvaluacion,
                domain_id: this.helpersService.getDominioId(),
                estado_id: 0,
            };
            this.parametroService.guardarPreguntaAlumno(parametros).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Los Datos se registraron correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    }).then(() => {
                        // Acción adicional después de cerrar el modal
                    });
                },
                (error: any) => {
                    console.error('Error al guardar la respuesta', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al guardar la respuesta. Inténtalo nuevamente.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            );
        } else {
            console.error('Formulario inválido');
            Swal.fire({
                title: 'Error',
                text: 'Formulario inválido. Revisa los campos y vuelve a intentarlo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }

    closeModal(event: Event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        this.ref?.close();
    }
    getAlternativasControls() {
        return (this.preguntaForm.get('alternativas') as FormArray).controls;
    }
}
