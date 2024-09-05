import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { HelpersService } from 'src/app/helpers.service';
import Swal from 'sweetalert2';
import { RegistraUsuarioComponent } from './dialog/registra-usuario/registra-usuario.component';
import { InstitucionService } from '../service/institucion.service';

@Component({
  selector: 'app-lista-instituciones',
  templateUrl: './lista-instituciones.component.html',
  styleUrls: ['./lista-instituciones.component.scss']
})
export class ListaInstitucionesComponent {
  loading: boolean = false;
  institucionList: any[] = [];
  originalInstitucionList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id!: number; 

  constructor(
      private dialogService: DialogService,
      private helpersService: HelpersService,
      private institucionService: InstitucionService
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      this.listarInstituciones();
  }

  listarInstituciones() {
    this.loading = true;
    this.institucionService.getInstituciones(this.domain_id)
        .subscribe((response: any) => {
            console.log('Response:', response); // Verifica la estructura de la respuesta

            // Verifica si la respuesta es un arreglo
            if (Array.isArray(response)) {
                this.institucionList = response; // Ya es un arreglo
                this.originalInstitucionList = [...response]; // Clona el arreglo
            } else {
                console.error('La respuesta no tiene el formato esperado');
            }

            this.loading = false;
        }, error => {
            this.loading = false;
            console.error('Error al obtener instituciones', error);
        });
}

 

  navigateAddInstitucion() {
      this.ref = this.dialogService.open(RegistraUsuarioComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarInstituciones();
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(RegistraUsuarioComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarInstituciones();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(RegistraUsuarioComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarInstituciones();
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
              this.institucionService
                  .eliminarInstitucion(id)
                  .subscribe(() => {
                      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
                      this.listarInstituciones();
                  }, (error: any) => {
                      Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                  });
          }
      });
  }

  onGlobalFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      if (!filterValue) {
          this.institucionList = [...this.originalInstitucionList];
          return;
      }

      this.institucionList = this.originalInstitucionList.filter((institucion) =>
          institucion.nombre.toLowerCase().includes(filterValue)
      );
  }
}