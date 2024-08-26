import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { AeProfesionesComponent } from './ae-profesiones/ae-profesiones.component';
import { ProfesionService } from '../service/profesion.service';

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styleUrls: ['./profesiones.component.scss']
})
export class ProfesionesComponent {
  loading: boolean = false;
  profesionesList: any[] = [];
  originalProfesionesList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
      private dialogService: DialogService,
      private helpersService: HelpersService,
      private profesionService: ProfesionService
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      console.log(this.domain_id);
      this.listarProfesiones();
  }

  listarProfesiones() {
      this.loading = true;
      this.profesionService
          .getProfesiones(this.domain_id)
          .subscribe((response: any) => {
              this.profesionesList = response.data;
              this.originalProfesionesList = [...response.data];
              this.loading = false;
          });
  }

  navigateAddProfesion() {
      this.ref = this.dialogService.open(AeProfesionesComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarProfesiones();
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeProfesionesComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarProfesiones();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeProfesionesComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarProfesiones();
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
              this.profesionService
                  .eliminarProfesion(id)
                  .subscribe(() => {
                      Swal.fire('Eliminado', 'La profesión ha sido eliminada.', 'success');
                      this.listarProfesiones();
                  }, (error) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar la profesión.', 'error');
                  });
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.profesionesList = [...this.originalProfesionesList];
          return;
      }

      this.profesionesList = this.originalProfesionesList.filter((profesion) =>
          profesion.nombre.toLowerCase().includes(filterValue)
      );
  }
}