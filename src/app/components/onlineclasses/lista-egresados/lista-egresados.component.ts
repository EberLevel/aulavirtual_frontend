import { Component } from '@angular/core';
import {
    DynamicDialogRef,
    DialogService,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { AeListaEgresadosComponent } from './ae-lista-egresados/ae-lista-egresados.component';
import { CandidatoService } from '../service/candidato.service';

@Component({
    selector: 'app-lista-egresados',
    templateUrl: './lista-egresados.component.html',
    styleUrls: ['./lista-egresados.component.scss'],
})
export class ListaEgresadosComponent {
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
        this.candidato_id = this.helpersService.getPostulanteId();

        // Obtener la ciudad desde el modal
        const ciudad = this.config.data.ciudad;
        if (ciudad) {
            this.ciudad_id = ciudad.id;
            console.log('Ciudad recibida:', ciudad);
            // Puedes usar los datos de la ciudad como desees en el componente hijo
        }

        this.listarPostulantesSegunRol();
    }

    listarPostulantesSegunRol() {
        if (!this.ciudad_id) {
            console.error('Ciudad ID no proporcionada.');
            return;
        }

        this.loading = true;

        this.candidatoService.getCandidatosByCiudad(this.ciudad_id).subscribe(
            (response: any) => {
                this.candidatoList = response.data;
                this.originalCandidatoList = [...response.data];
                this.loading = false;
            },
            (error) => {
                console.error('Error al obtener los candidatos:', error);
                this.loading = false;
            }
        );
    }

    navigateAddPostulante() {
        this.ref = this.dialogService.open(AeListaEgresadosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'add', ciudad_id: this.ciudad_id },
        });
        this.ref.onClose.subscribe(() => {
            this.listarPostulantesSegunRol();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(AeListaEgresadosComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'ver', data: data },
        });
    }

    navigateToEdit(data: any) {
        this.ref = this.dialogService.open(AeListaEgresadosComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'actualizar', data: data, postulanteId: data.id, ciudad_id: this.ciudad_id },
        });
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
