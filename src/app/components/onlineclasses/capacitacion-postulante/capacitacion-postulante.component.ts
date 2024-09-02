import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { CapacitacionesPostulanteService } from '../service/capacitaciones-postulante.service';
import { HelpersService } from 'src/app/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AeCapacitacionPostulanteComponent } from './ae-capacitacion-postulante/ae-capacitacion-postulante.component';

@Component({
  selector: 'app-capacitacion-postulante',
  templateUrl: './capacitacion-postulante.component.html',
  styleUrls: ['./capacitacion-postulante.component.scss']
})
export class CapacitacionPostulanteComponent {
  loading: boolean = false;
  capacitacionesList: any[] = [];
  originalCapacitacionesList: any[] = [];
  ref: DynamicDialogRef | undefined;
  domain_id: any;
  @Input() postulanteId!: number; 
  
  constructor(
      private dialogService: DialogService,
      private capacitacionesPostulanteService: CapacitacionesPostulanteService,
      private helpersService: HelpersService,
      private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // Verifica si el postulanteId se ha pasado como Input, si no, lo obtiene desde HelpersService
    if (!this.postulanteId) {
        this.postulanteId = this.helpersService.getPostulanteId(); // Fallback en caso de que no se reciba como Input
    }

    this.domain_id = this.helpersService.getDominioId();
    this.capacitacionesPostulanteService.getDataCreate(this.domain_id).subscribe(() => {
        this.listarCapacitaciones();
    });
    console.log('Datos al iniciar:', this.capacitacionesList);
}

  sanitizarImagen(imagenBase64: string) {
      return this.sanitizer.bypassSecurityTrustUrl(imagenBase64);
  }

  listarCapacitaciones() {
    if (this.postulanteId) {  // Ahora usa el postulanteId que fue recibido o obtenido
        this.loading = true;
        this.capacitacionesPostulanteService.getCapacitacionesByPostulante(this.postulanteId).subscribe((response: any) => {
            this.capacitacionesList = response.data.map((item: any) => {
                return {
                    ...item,
                    // Cambiamos el valor de 'estado' para que sea el nombre del estado_ano
                    estado: item.estado_ano ? item.estado_ano.nombre : 'Desconocido',
                    fechaInicio: new Date(item.fecha_inicio),
                    fechaTermino: new Date(item.fecha_termino),
                    imagen_certificado: this.sanitizarImagen(item.imagen_certificado || ''),
                };
            });
            this.originalCapacitacionesList = [...this.capacitacionesList];
            console.log('Capacitaciones cargadas:', this.capacitacionesList);
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    } else {
        Swal.fire('Error', 'No se pudo obtener el ID del postulante.', 'error');
    }
}



  navigateAdd() {
      this.ref = this.dialogService.open(AeCapacitacionPostulanteComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'add' },
      });
  }

  navigateToDetalle(data: any) {
      this.ref = this.dialogService.open(AeCapacitacionPostulanteComponent, {
          width: '80%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'ver', data: data },
      });
  }

  navigateToEdit(data: any) {
    console.log("navigateToEdit")
    console.log(data)
      this.ref = this.dialogService.open(AeCapacitacionPostulanteComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { acciones: 'actualizar', data: data },
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
              this.capacitacionesPostulanteService.eliminarCapacitacion(id).subscribe(
                  () => {
                      Swal.fire({
                          title: 'Eliminado',
                          text: 'El registro ha sido eliminado.',
                          icon: 'success',
                      });
                      this.listarCapacitaciones();
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
          this.capacitacionesList = [...this.originalCapacitacionesList];
          return;
      }

      this.capacitacionesList = this.originalCapacitacionesList.filter(
          (capacitacion) =>
              capacitacion.nombre.toLowerCase().includes(filterValue) ||
              capacitacion.institucion.toLowerCase().includes(filterValue)
      );
  }
}