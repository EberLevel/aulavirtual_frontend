import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { AeListaPostulantesComponent } from './ae-lista-postulantes/ae-lista-postulantes.component';
import { PostulanteService } from '../service/postulante.service';


@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.scss']
})
export class ListaPostulantesComponent {
  loading: boolean = false;
  postulanteList: any[] = [];
  originalPostulanteList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number;

  constructor(
    private dialogService: DialogService,
    private helpersService: HelpersService,
    private postulanteService: PostulanteService
  ) {}

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    this.listarPostulantes();
  }

  listarPostulantes() {
    this.loading = true;
    this.postulanteService.getPostulantes(this.domain_id).subscribe((response: any) => {
      this.postulanteList = response.data;
      this.originalPostulanteList = [...response.data];
      this.loading = false;
    });
  }

  navigateAddPostulante() {
    this.ref = this.dialogService.open(AeListaPostulantesComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'add' },
    });

    this.ref.onClose.subscribe(() => {
      this.listarPostulantes();
    });
  }

  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(AeListaPostulantesComponent, {
      width: '80%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'ver', data: data },
    });

    this.ref.onClose.subscribe(() => {
      this.listarPostulantes();
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(AeListaPostulantesComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'actualizar', data: data },
    });

    this.ref.onClose.subscribe(() => {
      this.listarPostulantes();
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
        this.postulanteService.eliminarPostulante(id).subscribe(() => {
          Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
          this.listarPostulantes();
        }, (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
        });
      }
    });
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.postulanteList = [...this.originalPostulanteList];
      return;
    }

    this.postulanteList = this.originalPostulanteList.filter((postulante) =>
      postulante.nombre.toLowerCase().includes(filterValue)
    );
  }
}