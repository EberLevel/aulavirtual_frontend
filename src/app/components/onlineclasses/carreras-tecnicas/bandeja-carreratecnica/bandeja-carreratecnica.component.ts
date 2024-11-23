import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Miembro, Parametro } from '../../interface/general';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../service/general.service';
import { Router } from '@angular/router';
import { RegCarrerastecnicasComponent } from '../dialog/reg-carrerastecnicas/reg-carrerastecnicas.component';
import { RegCursosComponent } from '../../cursos/dialog/reg-cursos/reg-cursos.component';
import { EditarCarreraTecnicaComponent } from '../dialog/editar-carrera-tecnica/editar-carrera-tecnica.component';
import { VerCarreraTecnicaComponent } from '../dialog/ver-carrera-tecnica/ver-carrera-tecnica.component';
import { VerCursoDeCarreraComponent } from '../dialog/ver-curso-de-carrera/ver-curso-de-carrera.component';

import Swal from 'sweetalert2';	
import { HelpersService } from 'src/app/helpers.service';
import { ListPlanesEstudioComponent } from '../dialog/list-planes-estudio/list-planes-estudio.component';

@Component({
  selector: 'app-bandeja-carreratecnica',
  templateUrl: './bandeja-carreratecnica.component.html',
  styleUrls: ['./bandeja-carreratecnica.component.scss']
})
export class BandejaCarreratecnicaComponent {

  loading: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') tabledt1: Table | undefined;
  @Input() miembro: Miembro[] = [];
  @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

  carrerastecnicasList: any[] = []; // Cambia el tipo a any[] para recibir los datos del backend
  originalCarrerastecnicasList: any[] = []; // Add this line to store the original list

  ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private carrerasTecnicasService: GeneralService,
    private router: Router,
    private helpersService: HelpersService,
  ) { }

  ngOnInit(): void {
    this.listarCarrerasTecnicas();
  }

  listarCarrerasTecnicas() {
    const domain_id= this.helpersService.getDominioId();
    this.carrerasTecnicasService.getCarrerasTecnicas(domain_id).subscribe((response: any) => {
      this.carrerastecnicasList = response;
      this.originalCarrerastecnicasList = [...response]; // Actualiza la lista original después de obtener los datos
    });
  }

  navigateToNuevo() {
    console.log("nuevo");

    this.ref = this.dialogService.open(RegCarrerastecnicasComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header'
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log("Cerrando dialogo");
      this.listarCarrerasTecnicas(); // Recargar los datos de la tabla
    });
  }

  navigateAddCurso(id: number,total_creditos:number) {
    this.ref = this.dialogService.open(RegCursosComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { id: id ,total_creditos:total_creditos}
    });

    this.ref.onClose.subscribe((data: any) => {
      this.listarCarrerasTecnicas(); // Recargar los datos de la tabla
    });
  }


  navigateListPlan(data: any) {
    this.ref = this.dialogService.open(ListPlanesEstudioComponent, {
        width: '80%',
        styleClass: 'custom-dialog-header',
        data: { carreraId: data.id } // Pasar solo el ID de la carrera
    });

    this.ref.onClose.subscribe(() => {
        this.listarCarrerasTecnicas(); // Recargar los datos de la tabla después de cerrar el diálogo
    });
}


  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(VerCarreraTecnicaComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { data: data }
    });

    this.ref.onClose.subscribe((data: any) => {
      this.listarCarrerasTecnicas(); // Recargar los datos de la tabla
    });
  }

  navigateToEdit(data: any) {
    console.log("Editar", data);
    this.ref = this.dialogService.open(EditarCarreraTecnicaComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { data: data }
    });

    this.ref.onClose.subscribe((data: any) => {
      this.listarCarrerasTecnicas(); // Recargar los datos de la tabla
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
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carrerasTecnicasService.eliminarCarreraTecnica(id).subscribe(
          response => {
            Swal.fire(
              'Eliminado',
              'La carrera técnica ha sido eliminada.',
              'success'
            );
            // Aquí puedes actualizar la vista, por ejemplo, recargar la lista de carreras técnicas
          },
          error => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la carrera técnica.',
              'error'
            );
          }
        );
        this.listarCarrerasTecnicas(); // Recargar los datos de la tabla

      }
    });
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log("Filtro Global", filterValue);
    if (!filterValue) {
      this.carrerastecnicasList = [...this.originalCarrerastecnicasList];
      return;
    }

    this.carrerastecnicasList = this.originalCarrerastecnicasList.filter(carrera =>
      (carrera.codigo && carrera.codigo.toLowerCase().includes(filterValue)) ||
      (carrera.nombres && carrera.nombres.toLowerCase().includes(filterValue)) ||
      (carrera.cursos && carrera.cursos.toLowerCase().includes(filterValue))
    );
  }

  editarMiembro() {
    // Implementar la edición de miembro
  }

  eliminarMiembro() {
    // Implementar la eliminación de miembro
  }

  agregarcurso() {
    // Implementar la adición de curso
  }

  onRowSelect(event: any) {
    console.log("Organo-colegaido-sect");
  }

  onRowUnselect(event: any) {
    // Implementar la acción al deseleccionar una fila
  }
}