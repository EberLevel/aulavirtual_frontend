import { Component } from '@angular/core';
import { AeModalidadPuestoComponent } from './ae-modalidad-puesto/ae-modalidad-puesto.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { ModalidadPuestoService } from '../service/modalidad-puesto.service';

@Component({
  selector: 'app-modalidad-puesto',
  templateUrl: './modalidad-puesto.component.html',
  styleUrls: ['./modalidad-puesto.component.scss']
})
export class ModalidadPuestoComponent {
  loading: boolean = false;
  modalidadPuestoList: any[] = [];
  originalModalidadPuestoList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
    private dialogService: DialogService,
    private helpersService: HelpersService,
    private modalidadPuestoService: ModalidadPuestoService
  ) {}

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    this.listarModalidadesPuesto();
  }

  listarModalidadesPuesto() {
    this.loading = true;
    this.modalidadPuestoService
      .getModalidadesPuesto(this.domain_id)
      .subscribe((response: any) => {
        this.modalidadPuestoList = response.data;
        this.originalModalidadPuestoList = [...response.data];
        this.loading = false;
      });
  }

  navigateAddModalidadPuesto() {
    this.ref = this.dialogService.open(AeModalidadPuestoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'add' },
    });

    this.ref.onClose.subscribe(() => {
      this.listarModalidadesPuesto();
    });
  }

  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(AeModalidadPuestoComponent, {
      width: '80%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'ver', data: data },
    });

    this.ref.onClose.subscribe(() => {
      this.listarModalidadesPuesto();
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(AeModalidadPuestoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'actualizar', data: data },
    });

    this.ref.onClose.subscribe(() => {
      this.listarModalidadesPuesto();
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
        this.modalidadPuestoService
          .eliminarModalidadPuesto(id)
          .subscribe(() => {
            Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
            this.listarModalidadesPuesto();
          }, (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
          });
      }
    });
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.modalidadPuestoList = [...this.originalModalidadPuestoList];
      return;
    }

    this.modalidadPuestoList = this.originalModalidadPuestoList.filter((modalidad) =>
      modalidad.nombre.toLowerCase().includes(filterValue)
    );
  }
}
