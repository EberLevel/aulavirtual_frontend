import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { AnoService } from '../service/ano.service';
import { AeAfilidadoPartidoComponent } from './ae-afilidado-partido/ae-afilidado-partido.component';

@Component({
  selector: 'app-afiliado-partido',
  templateUrl: './afiliado-partido.component.html',
  styleUrls: ['./afiliado-partido.component.scss']
})
export class AfiliadoPartidoComponent {
  loading: boolean = false;
  anosList: any[] = [];
  originalAnosList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
    private dialogService: DialogService,
    private anoService: AnoService,
    private helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    this.listarAnos();
  }

  listarAnos() {
    this.loading = true;
    this.anoService.getAnos(this.domain_id).subscribe((response: any) => {
      this.anosList = response.data;
      this.originalAnosList = [...response.data];
      this.loading = false;
    });
  }

  navigateAddAno() {
    this.ref = this.dialogService.open(AeAfilidadoPartidoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'add' },
    });

    this.ref.onClose.subscribe(() => {
      this.listarAnos();
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(AeAfilidadoPartidoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'actualizar', data: data },
    });

    this.ref.onClose.subscribe(() => {
      this.listarAnos();
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
        this.anoService.eliminarAno(id).subscribe(() => {
          Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
          this.listarAnos();
        }, (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
        });
      }
    });
  }
  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(AeAfilidadoPartidoComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'ver', data: data },
    });
  }
  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.anosList = [...this.originalAnosList];
      return;
    }

    this.anosList = this.originalAnosList.filter((ano) =>
      ano.nombre.toLowerCase().includes(filterValue)
    );
  }
}