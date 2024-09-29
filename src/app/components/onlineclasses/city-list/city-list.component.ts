import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { AeCityFormComponent } from './ae-city-form/ae-city-form.component';
import { HelpersService } from 'src/app/helpers.service';
import { CiudadService } from '../service/ciudad.service';
import { DatosPersonalesCandidatoComponent } from '../../agendaVirtual/datos-personales-candidato/datos-personales-candidato.component';

interface City {
    code: string;
    name: string;
    status: string;
    observations: string;
}

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
    styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
    loading: boolean = false;
    ciudadesList: any[] = [];
    ref: DynamicDialogRef | undefined;
    domain_id: any;

    constructor(
        private dialogService: DialogService,
        private ciudadService: CiudadService,
        private helpersService: HelpersService
    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        this.listarCiudades();
    }

    listarCiudades() {
        this.loading = true;
        this.ciudadService.getCiudadesByDomain(this.domain_id).subscribe((response: any) => {
            this.ciudadesList = response.data;
            this.loading = false;
        });
        console.log("ciudadesList" , this.ciudadesList);
    }

    navigateAdd() {
        this.ref = this.dialogService.open(AeCityFormComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'add' },
        });
        this.ref.onClose.subscribe(() => {
            this.listarCiudades();
        });
    }

    navigateToEdit(ciudad: any) {
        this.ref = this.dialogService.open(AeCityFormComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'actualizar', ciudad: ciudad },
        });
        this.ref.onClose.subscribe(() => {
            this.listarCiudades();
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
                this.ciudadService.eliminarCiudad(id).subscribe(
                    () => {
                        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
                        this.listarCiudades();
                    },
                    (error: any) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                    }
                );
            }
        });
    }

    navigateToOpenEgresados(ciudad: any) {
        this.ref = this.dialogService.open(DatosPersonalesCandidatoComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'abrir', ciudad: ciudad }, // Pasa la ciudad seleccionada
        });
        this.ref.onClose.subscribe(() => {
            this.listarCiudades();
        });
    }    

    onGlobalFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        if (!filterValue) {
            this.listarCiudades();
            return;
        }

        this.ciudadesList = this.ciudadesList.filter(
            (ciudad) =>
                ciudad.nombre.toLowerCase().includes(filterValue) ||
                ciudad.codigo.toLowerCase().includes(filterValue)
        );
    }
}