import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CandidatoService } from 'src/app/components/onlineclasses/service/candidato.service';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ae-datos-personales-candidato',
    templateUrl: './ae-datos-personales-candidato.component.html',
    styleUrls: ['./ae-datos-personales-candidato.component.scss'],
})
export class AeDatosPersonalesCandidatoComponent {
    postulanteForm: FormGroup;
    rolId!: number;
    acciones: string;
    generoOptions: any[] = [
        { label: 'Masculino', value: 'M' },
        { label: 'Femenino', value: 'F' },
    ];
    docIdentidadOptions: any[] = []; // Llenar con opciones del backend
    ocupacionOptions: any[] = []; // Llenar con opciones del backend
    estadoActualOptions: any[] = []; // Llenar con opciones del backend
    domain_id: any;
    postulanteId: any;
    public afiliacionOptions: any[] = [
        { label: 'Sentimiento Amazonense', value: 'sentimiento_amazonense' },
        { label: 'Somos Perú', value: 'somos_peru' },
        { label: 'Ningún Partido', value: 'ningun_partido' },
        { label: 'Otro Partido', value: 'otro_partido' },
    ];

    public estadoOptions: any[] = [
        { label: 'Aprobado', value: 'aprobado', color: 'green' },
        { label: 'Desaprobado', value: 'desaprobado', color: 'red' },
        { label: 'Observado', value: 'observado', color: 'yellow' },
        { label: 'En Evaluación', value: 'en_evaluacion', color: 'gray' },
    ];

    public identificationDocuments: any[] = [
        { label: 'DNI', value: 1 },
        { label: 'CE', value: 2 },
    ];
    public estadoCivilOptions: any[] = [
        { label: 'Soltero', value: 0 },
        { label: 'Casado', value: 1 },
        { label: 'Viudo', value: 2 },
        { label: 'Divorciado', value: 3 },
    ];
    public gradoInstruccionOptions: any[] = [];
    public profesionOptions: any[] = [];
    public selectedEstadoColor: string = '';
    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private candidatoService: CandidatoService,
        private helpersService: HelpersService,
        private cd: ChangeDetectorRef
    ) {
        this.acciones = this.config.data.acciones;
        this.rolId = this.helpersService.getRolId(); // Obtén el rol desde el servicio

        // Obtener el `ciudad_id` desde la configuración del componente
        if (this.config.data.ciudad_id) {
            console.log('Ciudad ID recibido:', this.config.data.ciudad_id);
        } else {
            console.log('No se recibió el Ciudad ID.');
        }

        if (this.rolId === 8) {
            this.postulanteId = this.config.data.postulanteId; // Solo asigna el ID del postulante si el rolId es 8
        } else if (this.rolId !== 8) {
            this.rolId = 25; // Si el rol no es 8, lo asigna como 21
        }

        // Definir las validaciones del formulario
        this.postulanteForm = this.fb.group({
            code: [{ value: '', disabled: true }],
            position_code: [''],
            nombre: [''],
            genero: [''],
            telefono: [''],
            fecha_nacimiento: [''],
            edad: [{ value: '', disabled: true }],
            email: ['', [Validators.email]],
            contrasena: ['', Validators.required],
            doc_identidad: [''],
            numero_documento: ['', Validators.required],
            estado_civil: [''],
            number_children: [],
            grado_instruccion: [''],
            profesion: [''],
            ocupacion_actual: [''],
            imagen: [''],
            estado_actual: [''],
            fecha_afiliacion: [''],
        });
    }

    onFileChange(event: any) {
        const file = event.files[0]; // Captura el archivo seleccionado

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const base64String = e.target.result.split(',')[1];
                this.postulanteForm.patchValue({
                    imagen: base64String, // Almacena la cadena base64 en el formulario
                    nombre_archivo: file.name, // Almacena el nombre del archivo en el formulario
                });
            };
            reader.readAsDataURL(file);
        }
    }

    calculateAge(birthdate: string): number | null {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return isNaN(age) ? null : age; // Devolver null si el cálculo no es válido
    }

    loadDropdownOptions() {
        this.candidatoService
            .getDataCreate(this.domain_id)
            .subscribe((data: any) => {
                console.log('Datos recibidos para dropdowns:', data);

                // Evitar sobrescribir si los datos están vacíos
                this.identificationDocuments =
                    data.identification_documents &&
                    data.identification_documents.length > 0
                        ? data.identification_documents
                        : this.identificationDocuments;

                this.estadoCivilOptions =
                    data.marital_statuses && data.marital_statuses.length > 0
                        ? data.marital_statuses
                        : this.estadoCivilOptions;

                this.gradoInstruccionOptions = data.education_degrees || [];
                this.profesionOptions = data.professions || [];
                this.estadoActualOptions = data.current_states || [];
                this.ocupacionOptions = data.ocupacion_actual || [];

                // Las opciones ya están cargadas en los dropdowns, no necesitamos hacer nada más aquí
            });
    }

    ngOnInit(): void {
        this.rolId = this.helpersService.getRolId();
        this.domain_id = this.helpersService.getDominioId();

        // Carga las opciones de dropdown y luego obtiene los datos del candidato
        this.loadDropdownOptions();

        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            const postulanteId = this.config.data.data.id; // Obtén el ID del postulante

            // Llamada al servicio para obtener los datos del postulante
            this.candidatoService
                .getCandidatoById(postulanteId)
                .subscribe((data: any) => {
                    console.log('Datos recibidos del backend:', data);

                    // Asegúrate de que los datos existan antes de hacer el patchValue
                    if (data && data.candidato) {
                        this.postulanteForm.patchValue({
                            code: data.candidato.code || '',
                            position_code: data.candidato.position_code || '',
                            nombre: data.candidato.nombre || '',
                            genero: data.candidato.sex || '',
                            telefono: data.candidato.phone || '',
                            fecha_nacimiento:
                                this.convertToDate(data.candidato.date_birth) ||
                                '',
                            edad:
                                this.calculateAge(data.candidato.date_birth) ||
                                '',
                            email: data.candidato.email || '',
                            doc_identidad:
                                data.candidato.identification_document_id || '',
                            numero_documento:
                                data.candidato.identification_number || '',
                            estado_civil:
                                data.candidato.marital_status_id !== null
                                    ? Number(data.candidato.marital_status_id)
                                    : null,
                            number_children:
                                data.candidato.number_children || '',
                            grado_instruccion:
                                data.candidato.education_degree_id || '',
                            profesion: data.candidato.profesion || '',
                            ocupacion_actual:
                                data.candidato.ocupacion_actual || '', // Asigna directamente el valor obtenido
                            estado_actual: data.candidato.estado_actual || '', // Asigna directamente el valor obtenido
                            fecha_afiliacion:
                                this.convertToDate(
                                    data.candidato.date_affiliation
                                ) || '',
                        });
                    } else {
                        console.error(
                            'No se encontraron datos de candidato en la respuesta.'
                        );
                    }
                });
        }

        // Escucha cambios en la fecha de nacimiento para calcular la edad automáticamente
        this.postulanteForm
            .get('fecha_nacimiento')
            ?.valueChanges.subscribe((birthdate) => {
                const calculatedAge = this.calculateAge(birthdate);
                this.postulanteForm
                    .get('edad')
                    ?.setValue(calculatedAge || '', { emitEvent: false });
            });
    }

    convertToDate(dateString: string): Date | null {
        return dateString ? new Date(dateString) : null;
    }
    formatDate(date: string): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2); // Añade cero si es necesario
        const day = ('0' + d.getDate()).slice(-2); // Añade cero si es necesario
        return `${year}-${month}-${day}`;
    }

    guardarPostulante() {
        if (this.postulanteForm.valid) {
            // Habilita el campo 'code' si está deshabilitado (si es necesario)
            this.postulanteForm.get('code')?.enable();

            // Verificar si `ciudad_id` está presente; si no, obtenerlo del backend
            if (!this.config.data.ciudad_id && this.acciones === 'actualizar') {
                const candidatoId = this.config.data.data.id;
                this.candidatoService
                    .getCiudadByCandidato(candidatoId)
                    .subscribe(
                        (response: any) => {
                            // Asignar el `ciudad_id` recibido de la respuesta y continuar con el guardado o actualización
                            this.config.data.ciudad_id = response.ciudad_id;
                            this.enviarDatosCandidato();
                        },
                        (error: any) => {
                            console.error('Error al obtener ciudad_id:', error);
                            Swal.fire(
                                'Error',
                                'No se pudo obtener el ID de la ciudad para este candidato.',
                                'error'
                            );
                        }
                    );
            } else {
                // Si ya se tiene el `ciudad_id`, continuar directamente con el guardado o actualización
                this.enviarDatosCandidato();
            }
        } else {
            console.error('Formulario inválido');
        }
    }

    enviarDatosCandidato() {
        const postulanteData: any = {
            code: this.postulanteForm.value.code,
            position_code: this.postulanteForm.value.position_code,
            nombre: this.postulanteForm.value.nombre,
            genero: this.postulanteForm.value.genero,
            telefono: this.postulanteForm.value.telefono,
            fecha_nacimiento: this.postulanteForm.value.fecha_nacimiento,
            email: this.postulanteForm.value.email,
            password: this.postulanteForm.value.contrasena,
            identification_document_id: this.postulanteForm.value.doc_identidad,
            identification_number: this.postulanteForm.value.numero_documento,
            marital_status_id:
                this.postulanteForm.value.estado_civil !== null
                    ? Number(this.postulanteForm.value.estado_civil)
                    : null,
            number_children: this.postulanteForm.value.number_children,
            age: this.calculateAge(this.postulanteForm.value.fecha_nacimiento),
            education_degree_id: this.postulanteForm.value.grado_instruccion,
            profesion: this.postulanteForm.value.profesion,
            ocupacion_actual: this.postulanteForm.value.ocupacion_actual?.value,
            imagen: this.postulanteForm.value.imagen,
            estado_actual: this.postulanteForm.value.estado_actual?.value,
            fecha_afiliacion: this.postulanteForm.value.fecha_afiliacion,
            domain_id: this.domain_id,
            ciudad_id: this.config.data.ciudad_id, // Ahora seguro de que tenemos el `ciudad_id`
        };

        console.log('Datos mapeados enviados al backend:', postulanteData);

        // Verificar si la acción es actualizar o guardar
        if (this.acciones === 'actualizar') {
            const id = this.config.data.data.id;
            this.candidatoService
                .actualizarCandidato(id, postulanteData)
                .subscribe(
                    (response: any) => {
                        this.ref?.close();
                        Swal.fire(
                            '¡Éxito!',
                            'Los datos se actualizaron correctamente',
                            'success'
                        );
                    },
                    (error: any) => {
                        console.error('Error en la solicitud:', error);
                        Swal.fire(
                            'Error',
                            'Hubo un problema al actualizar el registro',
                            'error'
                        );
                    }
                );
        } else {
            this.candidatoService.guardarCandidato(postulanteData).subscribe(
                (response: any) => {
                    this.ref?.close();
                    Swal.fire(
                        '¡Éxito!',
                        'Los datos se registraron correctamente',
                        'success'
                    );
                },
                (error: any) => {
                    console.error('Error en la solicitud:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al registrar el postulante',
                        'error'
                    );
                }
            );
        }
    }

    closeModal(event: Event) {
        event.preventDefault();
        this.ref?.close();
    }
    onEstadoChange(event: any) {
        const selectedEstado = this.estadoOptions.find(
            (option) => option.value === event.value
        );
        this.selectedEstadoColor = selectedEstado ? selectedEstado.color : '';
    }
}
