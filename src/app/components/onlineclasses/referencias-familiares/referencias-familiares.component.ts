import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
import { AeReferenciasFamiliaresComponent } from './ae-referencias-familiares/ae-referencias-familiares.component';
import { ReferenciasFamiliaresService } from '../service/referencias-familiares.service';

@Component({
  selector: 'app-referencias-familiares',
  templateUrl: './referencias-familiares.component.html',
  styleUrls: ['./referencias-familiares.component.scss']
})
export class ReferenciasFamiliaresComponent {
  loading: boolean = false;
  referenciasList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id: any;

  constructor(
      private dialogService: DialogService,
      private referenciasFamiliaresService: ReferenciasFamiliaresService,
      private helpersService: HelpersService,
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      this.listarReferencias();
  }

  listarReferencias() {
    const idPostulante = this.helpersService.getPostulanteId(); 

    if (idPostulante) {
        this.referenciasFamiliaresService.getReferenciasByPostulante(idPostulante).subscribe((response: any) => {
            this.referenciasList = response.data;
            console.log('Referencias cargadas:', this.referenciasList);
        }, error => {
            Swal.fire('Error', 'Hubo un problema al cargar las referencias.', 'error');
        });
    } else {
        Swal.fire('Error', 'No se pudo obtener el ID del usuario.', 'error');
    }
  }

  navigateAdd() {
      this.ref = this.dialogService.open(AeReferenciasFamiliaresComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarReferencias();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeReferenciasFamiliaresComponent, {
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
              this.referenciasFamiliaresService.eliminarReferencia(id).subscribe(
                  () => {
                      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
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
      this.referenciasList = this.referenciasList.filter(
          (referencia) =>
              referencia.nombre.toLowerCase().includes(filterValue) ||
              referencia.ocupacion.toLowerCase().includes(filterValue)
      );
  }
}
