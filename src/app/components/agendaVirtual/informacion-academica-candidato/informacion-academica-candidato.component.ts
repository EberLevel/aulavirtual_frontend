import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { InformacionAcademicaService } from '../../onlineclasses/service/informacion-academica.service';
import { AeInformacionAcademicaCandidatoComponent } from './ae-informacion-academica-candidato/ae-informacion-academica-candidato.component';
import { InformacionAcademicaCandidatoService } from '../../onlineclasses/service/informacion-academica-candidato.service';

@Component({
    selector: 'app-informacion-academica-candidato',
    templateUrl: './informacion-academica-candidato.component.html',
    styleUrls: ['./informacion-academica-candidato.component.scss'],
})
export class InformacionAcademicaCandidatoComponent {
    @Input() candidatoId!: number; // Agregar el decorador @Input para recibir candidatoId
    @Input() mostrarAcciones: boolean = true; 
    
    loading: boolean = false;
    informacionAcademicaList: any[] = [];
    ref: DynamicDialogRef | undefined;
    domain_id!: number;

    // Define estadoOptions en el componente padre
    estadoOptions: any[] = [
        { label: 'Aprobado', value: 1 },
        { label: 'Desaprobado', value: 2 },
        { label: 'Observado', value: 3 },
        { label: 'En Evaluación', value: 4 },
    ];

    constructor(
        private dialogService: DialogService,
        public helpersService: HelpersService,
        private informacionAcademicaService: InformacionAcademicaCandidatoService
    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        this.listarInformacionAcademica();
    }

    listarInformacionAcademica() {
        this.loading = true;
        this.informacionAcademicaService
            .getInformacionAcademicaByDomainId(this.domain_id)
            .subscribe(
                (response: any) => {
                    this.informacionAcademicaList = response.data.map(
                        (item: any) => {
                            item.estado = this.getEstadoLabel(item.estado_id);
                            return item;
                        }
                    );
                    this.loading = false;
                },
                (error) => {
                    console.error(
                        'Error al obtener la documentación:',
                        error
                    );
                    this.loading = false;
                }
            );
    }

    // Función para obtener la etiqueta del estado
    getEstadoLabel(estadoId: number): string {
        const estado = this.estadoOptions.find(
            (option) => option.value === estadoId
        );
        return estado ? estado.label : 'Sin estado';
    }

    navigateAddInformacion() {
        console.log("asdasdasd", this.candidatoId)
        this.ref = this.dialogService.open(
            AeInformacionAcademicaCandidatoComponent,
            {
                width: '90%',
                styleClass: 'custom-dialog-header',
                data: { acciones: 'add', domain_id: this.domain_id, candidato_id: this.candidatoId, },
            }
        );
        this.ref.onClose.subscribe(() => {
            this.listarInformacionAcademica();
        });
    }

    navigateToEdit(data: any) {
        this.ref = this.dialogService.open(
            AeInformacionAcademicaCandidatoComponent,
            {
                width: '90%',
                styleClass: 'custom-dialog-header',
                data: { acciones: 'actualizar', data: data },
            }
        );
        this.ref.onClose.subscribe(() => {
            this.listarInformacionAcademica();
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
                this.informacionAcademicaService
                    .eliminarInformacionAcademica(id)
                    .subscribe(
                        () => {
                            Swal.fire(
                                'Eliminado',
                                'El registro ha sido eliminado.',
                                'success'
                            );
                            this.listarInformacionAcademica();
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
        this.informacionAcademicaList = this.informacionAcademicaList.filter(
            (info) => info.nombre.toLowerCase().includes(filterValue)
        );
    }
}
