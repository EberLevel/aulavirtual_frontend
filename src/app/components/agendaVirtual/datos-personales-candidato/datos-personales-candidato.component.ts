import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { AeListaPostulantesComponent } from '../../onlineclasses/lista-postulantes/ae-lista-postulantes/ae-lista-postulantes.component';
import { PostulanteService } from '../../onlineclasses/service/postulante.service';

@Component({
  selector: 'app-datos-personales-candidato',
  templateUrl: './datos-personales-candidato.component.html',
  styleUrls: ['./datos-personales-candidato.component.scss']
})
export class DatosPersonalesCandidatoComponent {
  loading: boolean = false;
    postulanteList: any[] = [];
    originalPostulanteList: any[] = [];
    ref: DynamicDialogRef | undefined;
    domain_id!: number;
    postulante_id: any;

    constructor(
        private dialogService: DialogService,
        public helpersService: HelpersService,
        private postulanteService: PostulanteService
    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        this.postulante_id = this.helpersService.getPostulanteId();

        this.listarPostulantesSegunRol();
    }
    listarPostulantesSegunRol() {
        this.loading = true;

        const rol_id = this.helpersService.getRolId();

        if (rol_id === 8) {
            // Si el rol es 8, listar todos los postulantes
            this.postulanteService
                .getPostulantes(this.domain_id)
                .subscribe((response: any) => {
                    this.postulanteList = response.data;
                    this.originalPostulanteList = [...response.data];
                    this.loading = false;
                });
        } else {
            // Si no, listar solo el postulante logueado
            this.postulanteService
                .getPostulanteById(this.postulante_id)
                .subscribe((response: any) => {
                    this.postulanteList = [response.cvBank];
                    this.originalPostulanteList = [response.cvBank];
                    this.loading = false;
                });
        }
    }

    navigateAddPostulante() {
        this.ref = this.dialogService.open(AeListaPostulantesComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'add' },
        });
        this.ref.onClose.subscribe(() => {
            this.listarPostulantesSegunRol();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(AeListaPostulantesComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'ver', data: data },
        });
    }

    navigateToEdit(data: any) {
        this.ref = this.dialogService.open(AeListaPostulantesComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'actualizar', data: data, postulanteId: data.id },
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
                this.postulanteService.eliminarPostulante(id).subscribe(
                    () => {
                        Swal.fire(
                            'Eliminado',
                            'El registro ha sido eliminado.',
                            'success'
                        );
                        this.listarPostulantesSegunRol(); // Asegúrate de volver a listar correctamente
                    },
                    (error) => {
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
            this.postulanteList = [...this.originalPostulanteList];
            return;
        }

        this.postulanteList = this.originalPostulanteList.filter((postulante) =>
            postulante.nombre.toLowerCase().includes(filterValue)
        );
    }
}
