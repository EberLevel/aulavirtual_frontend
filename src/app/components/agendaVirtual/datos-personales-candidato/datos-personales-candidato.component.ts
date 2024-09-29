import { Component } from '@angular/core';
import {
    DynamicDialogRef,
    DialogService,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { CandidatoService } from '../../onlineclasses/service/candidato.service';
import { AeDatosPersonalesCandidatoComponent } from './ae-datos-personales-candidato/ae-datos-personales-candidato.component';

@Component({
    selector: 'app-datos-personales-candidato',
    templateUrl: './datos-personales-candidato.component.html',
    styleUrls: ['./datos-personales-candidato.component.scss'],
})
export class DatosPersonalesCandidatoComponent {
    loading: boolean = false;
    candidatoList: any[] = [];
    originalCandidatoList: any[] = [];
    ref: DynamicDialogRef | undefined;
    domain_id!: number;
    candidato_id: any;
    ciudad_id: any;

    constructor(
        private dialogService: DialogService,
        public helpersService: HelpersService,
        private candidatoService: CandidatoService,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        this.candidato_id = this.helpersService.getCandidatoId();
        console.log('candidato_id:', this.candidato_id);
        console.log("this.config.data",this.config.data)
        // Verificar si config y config.data existen antes de acceder a ciudad
        if (this.config && this.config.data) {
            this.ciudad_id = this.config.data.ciudad?.id; // Asegúrate de usar la propiedad correcta del objeto `ciudad`
            console.log('Datos de ciudad recibidos:', this.config.data.ciudad); // Imprime todo el objeto ciudad
            console.log('Ciudad ID recibido:', this.ciudad_id);
        } else {
            console.error('No se recibieron los datos de configuración necesarios.');
        }
    
        this.listarPostulantesSegunRol();
    }
    

    listarPostulantesSegunRol() {
        this.loading = true;
    
        if (this.ciudad_id) {
            // Listar candidatos por ciudad
            this.candidatoService.getCandidatosByCiudad(this.ciudad_id).subscribe(
                (response: any) => {
                    console.log('Respuesta del backend para getCandidatosByCiudad:', response);
                    this.candidatoList = response.data;
                    this.originalCandidatoList = [...response.data];
                    this.loading = false;
                },
                (error) => {
                    console.error('Error al obtener los candidatos por ciudad:', error);
                    this.loading = false;
                }
            );
        } else if (this.candidato_id) {
            // Listar candidatos por candidato_id si ciudad_id no está disponible
            this.candidatoService.getCandidatoById(this.candidato_id).subscribe(
                (response: any) => {
                    console.log('Respuesta del backend para getCandidatoById:', response);
                    // Acceder correctamente al objeto candidato
                    this.candidatoList = response.candidato ? [response.candidato] : [];
                    this.originalCandidatoList = [...this.candidatoList];
                    this.loading = false;
                },
                (error) => {
                    console.error('Error al obtener el candidato por ID:', error);
                    this.loading = false;
                }
            );
        } else {
            console.error('No se proporcionó ciudad_id ni candidato_id.');
            this.loading = false;
        }
    }    
    

    navigateAddPostulante() {
        this.ref = this.dialogService.open(
            AeDatosPersonalesCandidatoComponent,
            {
                width: '60%',
                styleClass: 'custom-dialog-header',
                data: { acciones: 'add', ciudad_id: this.ciudad_id },
            }
        );
        this.ref.onClose.subscribe(() => {
            this.listarPostulantesSegunRol();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(
            AeDatosPersonalesCandidatoComponent,
            {
                width: '80%',
                styleClass: 'custom-dialog-header',
                data: { acciones: 'ver', data: data },
            }
        );
    }

    navigateToEdit(data: any) {
        this.ref = this.dialogService.open(
            AeDatosPersonalesCandidatoComponent,
            {
                width: '60%',
                styleClass: 'custom-dialog-header',
                data: {
                    acciones: 'actualizar',
                    data: data,
                    postulanteId: data.id,
                    ciudad_id: this.ciudad_id,
                },
            }
        );
        this.ref.onClose.subscribe(() => {
            this.listarPostulantesSegunRol();
        });
    }

    navigateToDelete(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
        }).then((result) => {
            if (result.isConfirmed) {
                this.candidatoService.eliminarCandidato(id).subscribe(
                    () => {
                        Swal.fire(
                            'Eliminado',
                            'El registro ha sido eliminado.',
                            'success'
                        );
                        this.listarPostulantesSegunRol(); // Asegúrate de volver a listar correctamente
                    },
                    (error: any) => {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al eliminar el registro.',
                            'error'
                        );
                    }
                );
            }
        });
    }

    onGlobalFilter(event: Event) {
        const filterValue = (
            event.target as HTMLInputElement
        ).value.toLowerCase();
        if (!filterValue) {
            this.candidatoList = [...this.originalCandidatoList];
            return;
        }

        this.candidatoList = this.originalCandidatoList.filter((postulante) =>
            postulante.nombre.toLowerCase().includes(filterValue)
        );
    }
}
