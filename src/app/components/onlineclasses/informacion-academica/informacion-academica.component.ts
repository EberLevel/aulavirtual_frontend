import { Component } from '@angular/core';
import { AeInformacionAcademicaComponent } from './ae-informacion-academica/ae-informacion-academica.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../service/general.service';
import { InformacionAcademicaService } from '../service/informacion-academica.service';
import { HelpersService } from 'src/app/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-informacion-academica',
    templateUrl: './informacion-academica.component.html',
    styleUrls: ['./informacion-academica.component.scss'],
})
export class InformacionAcademicaComponent {
    loading: boolean = false;
    informacionAcademicaList: any[] = [];
    originalInformacionAcademicaList: any[] = [];
    ref: DynamicDialogRef | undefined;
    domain_id: any;

    constructor(
        private dialogService: DialogService,
        private informacionAcademicaService: InformacionAcademicaService,
        private helpersService: HelpersService,
        private sanitizer: DomSanitizer,
    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        this.informacionAcademicaService.getDataCreate(this.domain_id).subscribe(() => {
            this.listarInformacionAcademica();
        });
    }
    sanitizarImagen(imagenBase64: string) {
      return this.sanitizer.bypassSecurityTrustUrl(imagenBase64);
    }
// Usar en la lista de información académica
listarInformacionAcademica() {
  const idPostulante = this.helpersService.getPostulanteId(); 

  if (idPostulante) {
      this.informacionAcademicaService.getInformacionAcademicaByPostulante(idPostulante).subscribe((response: any) => {
          this.informacionAcademicaList = response.data.map((item: any) => {
              const grado = this.obtenerGradoInstruccion(item.grado_instruccion_id);
              return {
                  ...item,
                  gradoEstudios: grado ? grado.nombre : 'Desconocido',
                  profesion: this.obtenerDescripcionProfesion(item.profesion_id),
                  estadoEstudios: this.obtenerDescripcionEstadoAvance(item.estado_avance_id),
                  avance: grado ? `${Math.round(grado.porcentaje)}%` : 'N/A',
                  fechaInicio: new Date(item.fecha_inicio),
                  fechaTermino: new Date(item.fecha_termino),
                  imagen_certificado: this.sanitizarImagen(item.imagen_certificado || ''),
              };
          });
          this.originalInformacionAcademicaList = [...this.informacionAcademicaList];
      }, error => {
      });
  } else {
      Swal.fire('Error', 'No se pudo obtener el ID del usuario.', 'error');
  }
}
  
  convertImageToBase64(url: string, callback: (base64: string) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result as string);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  obtenerGradoInstruccion(id: number): any {
      return this.informacionAcademicaService.gradosInstruccion.find(g => g.id === id);
  }
  
  

    obtenerDescripcionGradoInstruccion(id: number): string {
        const grado = this.informacionAcademicaService.gradosInstruccion.find(
            (g) => g.id === id
        );
        return grado ? grado.nombre : 'Desconocido';
    }

    obtenerDescripcionProfesion(id: number): string {
        const profesion = this.informacionAcademicaService.profesiones.find(
            (p) => p.id === id
        );
        return profesion ? profesion.nombre : 'Desconocido';
    }

    obtenerDescripcionEstadoAvance(id: number): string {
        const estado = this.informacionAcademicaService.estadoAvances.find(
            (e) => e.id === id
        );
        return estado ? estado.nombre : 'Desconocido';
    }

    navigateAdd() {
        this.ref = this.dialogService.open(AeInformacionAcademicaComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'add' },
        });

        this.ref.onClose.subscribe(() => {
            this.listarInformacionAcademica();
        });
    }

    navigateToDetalle(data: any) {
        this.ref = this.dialogService.open(AeInformacionAcademicaComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'ver', data: data },
        });

        this.ref.onClose.subscribe(() => {
            this.listarInformacionAcademica();
        });
    }

    navigateToEdit(data: any) {
        console.log(data);
        this.ref = this.dialogService.open(AeInformacionAcademicaComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { acciones: 'actualizar', data: data },
        });

        this.ref.onClose.subscribe(() => {
            this.listarInformacionAcademica();
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
                this.informacionAcademicaService
                    .eliminarInformacionAcademica(id)
                    .subscribe(
                        () => {
                            Swal.fire({
                                title: 'Eliminado',
                                text: 'El registro ha sido eliminado.',
                                icon: 'success',
                            });
                            this.listarInformacionAcademica();
                        },
                        (error) => {
                            Swal.fire(
                                'Error',
                                'Hubo un problema al eliminar el registro.',
                                'error'
                            );
                        }
                    );
            }
        });
    }

    onGlobalFilter(event: Event) {
        const filterValue = (
            event.target as HTMLInputElement
        ).value.toLowerCase();
        if (!filterValue) {
            this.informacionAcademicaList = [
                ...this.originalInformacionAcademicaList,
            ];
            return;
        }

        this.informacionAcademicaList =
            this.originalInformacionAcademicaList.filter(
                (info) =>
                    info.gradoEstudios.toLowerCase().includes(filterValue) ||
                    info.profesion.toLowerCase().includes(filterValue)
            );
    }
}
