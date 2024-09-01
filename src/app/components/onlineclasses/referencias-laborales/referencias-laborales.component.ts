import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ReferenciasLaboralesService } from '../service/referencias-laborales.service';
import { HelpersService } from 'src/app/helpers.service';
import { AeReferenciasLaboralesComponent } from './ae-referencias-laborales/ae-referencias-laborales.component';

@Component({
  selector: 'app-referencias-laborales',
  templateUrl: './referencias-laborales.component.html',
  styleUrls: ['./referencias-laborales.component.scss']
})
export class ReferenciasLaboralesComponent {
  loading: boolean = false;
  referenciasList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id: any;

  constructor(
      private dialogService: DialogService,
      private referenciasLaboralesService: ReferenciasLaboralesService,
      private helpersService: HelpersService,
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      this.listarReferencias();
  }

  listarReferencias() {
    const idPostulante = this.helpersService.getPostulanteId(); 

    if (idPostulante) {
        this.referenciasLaboralesService.getReferenciasByPostulante(idPostulante).subscribe((response: any) => {
            this.referenciasList = response.data;
            console.log('Referencias cargadas:', this.referenciasList);
        }, error => {
            Swal.fire('Error', 'Hubo un problema al cargar las referencias laborales.', 'error');
        });
    } else {
        Swal.fire('Error', 'No se pudo obtener el ID del usuario.', 'error');
    }
  }

  navigateAdd() {
      this.ref = this.dialogService.open(AeReferenciasLaboralesComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarReferencias();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeReferenciasLaboralesComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarReferencias();
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
              this.referenciasLaboralesService.eliminarReferencia(id).subscribe(
                  () => {
                      Swal.fire({
                          title: 'Eliminado',
                          text: 'El registro ha sido eliminado.',
                          icon: 'success',
                      });
                      this.listarReferencias();
                  },
                  (error) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                  }
              );
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.referenciasList = [...this.referenciasList];
          return;
      }

      this.referenciasList = this.referenciasList.filter(
          (referencia) =>
              referencia.nombre.toLowerCase().includes(filterValue) ||
              referencia.ocupacion.toLowerCase().includes(filterValue)
      );
  }
}
