import { Component } from '@angular/core';
import { AeEstadoAvanceComponent } from './ae-estado-avance/ae-estado-avance.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { EstadoAvanceService } from '../service/estado-avance.service';

@Component({
  selector: 'app-estado-avance',
  templateUrl: './estado-avance.component.html',
  styleUrls: ['./estado-avance.component.scss']
})
export class EstadoAvanceComponent {
  loading: boolean = false;
  estadoAvanceList: any[] = [];
  originalEstadoAvanceList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
      private dialogService: DialogService,
      private helpersService: HelpersService ,
      private estadoAvanceService: EstadoAvanceService
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      console.log(this.domain_id);
      this.listarEstadosAvance();
  }

  listarEstadosAvance() {
      this.loading = true;
      this.estadoAvanceService
          .getEstadosAvance(this.domain_id)
          .subscribe((response: any) => {
              this.estadoAvanceList = response.data;
              this.originalEstadoAvanceList = [...response.data];
              this.loading = false;
          });
  }

  navigateAddEstadoAvance() {
      this.ref = this.dialogService.open(AeEstadoAvanceComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarEstadosAvance();
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeEstadoAvanceComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarEstadosAvance();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeEstadoAvanceComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarEstadosAvance();
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
              this.estadoAvanceService
                  .eliminarEstadoAvance(id)
                  .subscribe(() => {
                      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
                      this.listarEstadosAvance();
                  }, (error) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                  });
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.estadoAvanceList = [...this.originalEstadoAvanceList];
          return;
      }

      this.estadoAvanceList = this.originalEstadoAvanceList.filter((estado) =>
          estado.nombre.toLowerCase().includes(filterValue)
      );
  }
}
