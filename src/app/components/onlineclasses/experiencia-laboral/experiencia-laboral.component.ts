import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ExperienciaLaboralService } from '../service/experiencia-laboral.service';
import { HelpersService } from 'src/app/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AeExperienciaLaboralComponent } from './ae-experiencia-laboral/ae-experiencia-laboral.component';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss']
})
export class ExperienciaLaboralComponent {
  loading: boolean = false;
  experienciasList: any[] = [];
  originalExperienciasList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id: any;

  constructor(
      private dialogService: DialogService,
      private experienciaLaboralService: ExperienciaLaboralService,
      private helpersService: HelpersService,
      private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      this.experienciaLaboralService.getDataCreate(this.domain_id).subscribe(() => {
          this.listarExperiencias();
      });
      console.log('Datos al iniciar:', this.experienciasList);
  }

  sanitizarImagen(imagenBase64: string) {
      return this.sanitizer.bypassSecurityTrustUrl(imagenBase64);
  }

  listarExperiencias() {
    const idPostulante = this.helpersService.getPostulanteId(); 

    if (idPostulante) {
        this.loading = true
        this.experienciaLaboralService.getExperienciasByPostulante(idPostulante).subscribe((response: any) => {
            this.experienciasList = response.data.map((item: any) => {
                return {
                    ...item,
                    fechaIngreso: new Date(item.fecha_ingreso),
                    fechaTermino: new Date(item.fecha_termino),
                    imagen: item.imagen ? this.sanitizarImagen(item.imagen) : null,
                };
            });
            this.originalExperienciasList = [...this.experienciasList];
        }, error => {
            Swal.fire('Error', 'Hubo un problema al cargar las experiencias laborales.', 'error');
        });
    } else {
        Swal.fire('Error', 'No se pudo obtener el ID del usuario.', 'error');
    }
    this.loading = false
}

  navigateAdd() {
      this.ref = this.dialogService.open(AeExperienciaLaboralComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });

      this.ref.onClose.subscribe(() => {
          this.listarExperiencias();
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeExperienciaLaboralComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarExperiencias();
      });
  }

  navigateToEdit(data: any) {
      this.ref = this.dialogService.open(AeExperienciaLaboralComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
      });

      this.ref.onClose.subscribe(() => {
          this.listarExperiencias();
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
          customClass: {
              popup: 'custom-swal-popup',
          },
      }).then((result) => {
          if (result.isConfirmed) {
              this.experienciaLaboralService.eliminarExperiencia(id).subscribe(
                  () => {
                      Swal.fire({
                          title: 'Eliminado',
                          text: 'El registro ha sido eliminado.',
                          icon: 'success',
                      });
                      this.listarExperiencias();
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
          this.experienciasList = [...this.originalExperienciasList];
          return;
      }

      this.experienciasList = this.originalExperienciasList.filter(
          (experiencia) =>
              experiencia.puesto.toLowerCase().includes(filterValue) ||
              experiencia.institucion.toLowerCase().includes(filterValue)
      );
  }
}
