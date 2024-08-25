import { Component } from '@angular/core';
import { AeVinculosLaboralesComponent } from './ae-vinculos-laborales/ae-vinculos-laborales.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { VinculoLaboralService } from '../service/vinculo-laboral.service';

@Component({
  selector: 'app-vinculos-laborales',
  templateUrl: './vinculos-laborales.component.html',
  styleUrls: ['./vinculos-laborales.component.scss']
})
export class VinculosLaboralesComponent {
  loading: boolean = false;
  vinculoLaboralList: any[] = [];
  originalVinculoLaboralList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
      private dialogService: DialogService,
      private vinculoLaboralService: VinculoLaboralService,
      private helpersService: HelpersService 
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      console.log(this.domain_id)
      this.listarVinculosLaborales();
  }

  listarVinculosLaborales() {
      this.loading = true;
      this.vinculoLaboralService
          .getVinculosLaborales(this.domain_id)
          .subscribe((response: any) => {
              this.vinculoLaboralList = response.data;  // Ajustar según la respuesta de tu API
              this.originalVinculoLaboralList = [...response.data];
              this.loading = false;
          });
  }

  navigateAddVinculo() {
      this.ref = this.dialogService.open(AeVinculosLaboralesComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarVinculosLaborales();
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeVinculosLaboralesComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarVinculosLaborales();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeVinculosLaboralesComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarVinculosLaborales();
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
              this.vinculoLaboralService
                  .eliminarVinculoLaboral(id)
                  .subscribe(() => {
                      Swal.fire('Eliminado', 'El vínculo laboral ha sido eliminado.', 'success');
                      this.listarVinculosLaborales();
                  }, (error) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                  });
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.vinculoLaboralList = [...this.originalVinculoLaboralList];
          return;
      }

      this.vinculoLaboralList = this.originalVinculoLaboralList.filter((vinculo) =>
          vinculo.nombre.toLowerCase().includes(filterValue)
      );
  }
}
