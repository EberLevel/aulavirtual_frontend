import { Component } from '@angular/core';
import { AeEscalaComponent } from './ae-escala/ae-escala.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { EscalaService } from '../service/escala.service';

@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.scss']
})
export class EscalaComponent {
  loading: boolean = false;
  escalaList: any[] = [];
  originalEscalaList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
      private dialogService: DialogService,
      private helpersService: HelpersService ,
      private escalaService: EscalaService
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      console.log(this.domain_id);
      this.listarEscalas();
  }

  listarEscalas() {
      this.loading = true;
      this.escalaService
          .getEscalas(this.domain_id)
          .subscribe((response: any) => {
              this.escalaList = response.data;
              this.originalEscalaList = [...response.data];
              this.loading = false;
          });
  }

  navigateAddEscala() {
      this.ref = this.dialogService.open(AeEscalaComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarEscalas();
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeEscalaComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarEscalas();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeEscalaComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarEscalas();
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
              this.escalaService
                  .eliminarEscala(id)
                  .subscribe(() => {
                      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
                      this.listarEscalas();
                  }, (error) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                  });
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.escalaList = [...this.originalEscalaList];
          return;
      }

      this.escalaList = this.originalEscalaList.filter((escala) =>
          escala.nombre.toLowerCase().includes(filterValue)
      );
  }
}
