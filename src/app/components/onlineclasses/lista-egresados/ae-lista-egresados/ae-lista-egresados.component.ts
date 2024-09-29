import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { CandidatoService } from '../../service/candidato.service';

@Component({
    selector: 'app-ae-lista-egresados',
    templateUrl: './ae-lista-egresados.component.html',
    styleUrls: ['./ae-lista-egresados.component.scss'],
})
export class AeListaEgresadosComponent {
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
            this.rolId = 21; // Si el rol no es 8, lo asigna como 21
        }

        // Definir las validaciones del formulario
        this.postulanteForm = this.fb.group({
            code: [{ value: '', disabled: true }],
            codigo_puesto_asignado: [''],
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
            numero_hijos: [0],
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

    public identificationDocuments: any[] = [];
    public estadoCivilOptions: any[] = [];
    public gradoInstruccionOptions: any[] = [];
    public profesionOptions: any[] = [];

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
                this.identificationDocuments =
                    data.identification_documents || [];
                this.estadoCivilOptions = data.marital_statuses || [];
                this.gradoInstruccionOptions = data.education_degrees || [];
                this.profesionOptions = data.professions || [];
                this.estadoActualOptions = data.current_states || [];
                this.ocupacionOptions = data.ocupacion_actual || [];

                this.postulanteForm.patchValue({
                    code: data.code,
                    doc_identidad:
                        this.identificationDocuments.length > 0
                            ? this.identificationDocuments[0].id
                            : null,
                    estado_civil:
                        this.estadoCivilOptions.length > 0
                            ? this.estadoCivilOptions[0].id
                            : null,
                    grado_instruccion:
                        this.gradoInstruccionOptions.length > 0
                            ? this.gradoInstruccionOptions[0].id
                            : null,
                    profesion:
                        this.profesionOptions.length > 0
                            ? this.profesionOptions[0].id
                            : null,
                    estado_actual:
                        this.estadoActualOptions.length > 0
                            ? this.estadoActualOptions[0].id
                            : null,
                    ocupacion_actual:
                        this.ocupacionOptions.length > 0
                            ? this.ocupacionOptions[0].id
                            : null,
                });
            });
    }

    ngOnInit(): void {
        this.rolId = this.helpersService.getRolId();
        this.domain_id = this.helpersService.getDominioId();

        this.loadDropdownOptions();

        if (this.acciones === 'ver' || this.acciones === 'actualizar') {
            const postulanteId = this.config.data.data.id;

            this.candidatoService
                .getCandidatoById(postulanteId)
                .subscribe((data: any) => {
                    console.log(data);
                    this.postulanteForm.patchValue({
                        nombre: data.cvBank.names || '',
                        codigo_puesto_asignado: data.cvBank.position_code || '',
                        genero: data.cvBank.sex || '',
                        telefono: data.cvBank.phone || '',
                        fecha_nacimiento:
                            this.convertToDate(data.cvBank.date_birth) || '',
                        edad: this.calculateAge(data.cvBank.date_birth) || '',
                        email: data.cvBank.email || '',
                        doc_identidad:
                            data.cvBank.identification_document_id || '',
                        numero_documento:
                            data.cvBank.identification_number || '',
                        estado_civil: data.cvBank.marital_status_id || '',
                        numero_hijos: data.cvBank.number_children || '',
                        grado_instruccion:
                            data.cvBank.education_degree_id || '',
                        profesion: data.cvBank.profession_id || '',
                        ocupacion_actual: data.cvBank.ocupacion_actual_id || '',
                        estado_actual: data.cvBank.estado_actual_id || '',
                        fecha_afiliacion:
                            this.convertToDate(data.cvBank.date_affiliation) ||
                            '',
                    });
                });
        }

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

            // Crea un objeto solo con los campos obligatorios
            const postulanteData: any = {
                identification_number:
                    this.postulanteForm.value.numero_documento,
                password: this.postulanteForm.value.contrasena,
                domain_id: this.domain_id,
                ciudad_id: this.config.data.ciudad_id, // Incluir el ciudad_id aquí
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
                this.candidatoService
                    .guardarCandidato(postulanteData)
                    .subscribe(
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
        } else {
            console.error('Formulario inválido');
        }
    }

    closeModal(event: Event) {
        event.preventDefault();
        this.ref?.close();
    }
}
