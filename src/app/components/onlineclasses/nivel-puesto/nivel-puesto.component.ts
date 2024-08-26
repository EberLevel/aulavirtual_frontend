import { Component } from '@angular/core';
import { AeNivelPuestoComponent } from './ae-nivel-puesto/ae-nivel-puesto.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { NivelPuestoService } from '../service/nivel-puesto.service';

@Component({
  selector: 'app-nivel-puesto',
  templateUrl: './nivel-puesto.component.html',
  styleUrls: ['./nivel-puesto.component.scss']
})
export class NivelPuestoComponent {
  loading: boolean = false;
  nivelPuestoList: any[] = [];  // Cambiado a nivelPuestoList
  originalNivelPuestoList: any[] = [];  // Cambiado a originalNivelPuestoList
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
      private dialogService: DialogService,
      private helpersService: HelpersService,
      private nivelPuestoService: NivelPuestoService
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      this.listarNivelesPuesto();  // Cambiado a listarNivelesPuesto
  }

  listarNivelesPuesto() {
      this.loading = true;
      this.nivelPuestoService
          .getNivelesCargo(this.domain_id)
          .subscribe((response: any) => {
              this.nivelPuestoList = response.data;  // Ajustado a nivelPuestoList
              this.originalNivelPuestoList = [...response.data];
              this.loading = false;
          });
  }

  navigateAddNivelPuesto() {
      this.ref = this.dialogService.open(AeNivelPuestoComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarNivelesPuesto();  // Cambiado a listarNivelesPuesto
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeNivelPuestoComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarNivelesPuesto();  // Cambiado a listarNivelesPuesto
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeNivelPuestoComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarNivelesPuesto();  // Cambiado a listarNivelesPuesto
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
              this.nivelPuestoService
                  .eliminarNivelCargo(id)
                  .subscribe(() => {
                      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
                      this.listarNivelesPuesto();  // Cambiado a listarNivelesPuesto
                  }, (error) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                  });
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.nivelPuestoList = [...this.originalNivelPuestoList];
          return;
      }

      this.nivelPuestoList = this.originalNivelPuestoList.filter((area) =>
          area.nombre.toLowerCase().includes(filterValue)
      );
  }
}
