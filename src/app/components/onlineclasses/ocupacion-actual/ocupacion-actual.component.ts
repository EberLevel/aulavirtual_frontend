import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OcupacionActualService } from '../service/ocupacion-actual.service';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { AeOcupacionActualComponent } from './ae-ocupacion-actual/ae-ocupacion-actual.component';

@Component({
  selector: 'app-ocupacion-actual',
  templateUrl: './ocupacion-actual.component.html',
  styleUrls: ['./ocupacion-actual.component.scss']
})
export class OcupacionActualComponent {
  loading: boolean = false;
  ocupacionList: any[] = [];
  originalOcupacionList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number;

  constructor(
    private dialogService: DialogService,
    private ocupacionActualService: OcupacionActualService,
    private helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    this.listarOcupaciones();
    console.log(this.domain_id)
  }

  listarOcupaciones() {
    this.loading = true;
    this.ocupacionActualService.getOcupacionesActuales(this.domain_id).subscribe((response: any) => {
      this.ocupacionList = response.data;
      this.originalOcupacionList = [...response.data];
      this.loading = false;
    });
  }

  navigateAddOcupacion() {
    this.ref = this.dialogService.open(AeOcupacionActualComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'add' },
    });

    this.ref.onClose.subscribe(() => {
      this.listarOcupaciones();
    });
  }

  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(AeOcupacionActualComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'ver', data: data },
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(AeOcupacionActualComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'actualizar', data: data },
    });

    this.ref.onClose.subscribe(() => {
      this.listarOcupaciones();
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
        this.ocupacionActualService.eliminarOcupacionActual(id).subscribe(() => {
          Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
          this.listarOcupaciones();
        });
      }
    });
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.ocupacionList = [...this.originalOcupacionList];
      return;
    }

    this.ocupacionList = this.originalOcupacionList.filter((ocupacion) =>
      ocupacion.nombre.toLowerCase().includes(filterValue)
    );
  }
}
