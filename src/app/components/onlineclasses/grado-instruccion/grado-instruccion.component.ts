import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GradoInstruccionService } from '../service/grado-instruccion.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AeGradoInstruccionComponent } from './ae-grado-instruccion/ae-grado-instruccion.component';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-grado-instruccion',
    templateUrl: './grado-instruccion.component.html',
    styleUrls: ['./grado-instruccion.component.scss'],
})
export class GradoInstruccionComponent implements OnInit {
    loading: boolean = false;
    gradoInstruccionList: any[] = [];
    originalGradoInstruccionList: any[] = [];
    ref: DynamicDialogRef | undefined;
    domain_id!: number; 

    constructor(
        private dialogService: DialogService,
        private gradoInstruccionService: GradoInstruccionService,
        private helpersService: HelpersService  // Importar tu servicio de helpers

    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        console.log(this.domain_id)
        this.listarGradosInstruccion();
    }

    listarGradosInstruccion() {
        this.loading = true;
        this.gradoInstruccionService
            .getGradoInstrucciones(this.domain_id)
            .subscribe((response: any) => {
                this.gradoInstruccionList = response.data;  // Ajustar según la respuesta de tu API
                this.originalGradoInstruccionList = [...response.data];
                this.loading = false;
            });
    }

    navigateAddCurso() {
        this.ref = this.dialogService.open(AeGradoInstruccionComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'add' },
        });

        this.ref.onClose.subscribe(() => {
            this.listarGradosInstruccion();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(AeGradoInstruccionComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'ver', data: data },
        });

        this.ref.onClose.subscribe(() => {
            this.listarGradosInstruccion();
        });
    }

    navigateToEdit(data: any) {
        this.ref = this.dialogService.open(AeGradoInstruccionComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'actualizar', data: data },
        });

        this.ref.onClose.subscribe(() => {
            this.listarGradosInstruccion();
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
                this.gradoInstruccionService
                    .eliminarGradoInstruccion(id)
                    .subscribe(() => {
                        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
                        this.listarGradosInstruccion();
                    }, (error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                    });
            }
        });
    }

    onGlobalFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        if (!filterValue) {
            this.gradoInstruccionList = [...this.originalGradoInstruccionList];
            return;
        }

        this.gradoInstruccionList = this.originalGradoInstruccionList.filter((area) =>
            area.nombre.toLowerCase().includes(filterValue)
        );
    }
}
