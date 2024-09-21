import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../service/general.service';
import { catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

@Component({
  selector: 'app-registrar-modulo',
  templateUrl: './registrar-modulo.component.html',
  styleUrls: ['./registrar-modulo.component.scss']
})
export class RegistrarModuloComponent {

  visible: boolean = false;
  id: number = 0;
  estado: string = '';
  nombre: string = '';
  grupo: string = '';
  responsable: string = '';
  prioridad: string = '';
  descripcion: string = '';
  proyectoId: number = 0;
  public Editor = ClassicEditor as any;
  @ViewChild('ckeditor', { static: false }) ckeditor!: ElementRef;

  settings = {
    counter: false,
    plugins: [lgZoom]
  };

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    public ref: DynamicDialogRef,
    private empresaService: GeneralService,
    public config: DynamicDialogConfig
  ) {
    if (this.config.data.tarea) {
      this.id = this.config.data.tarea.id;
      this.estado = this.config.data.tarea.estado;
      this.nombre = this.config.data.tarea.nombre;
      this.grupo = this.config.data.tarea.grupo;
      this.responsable = this.config.data.tarea.responsable;
      this.prioridad = this.config.data.tarea.prioridad;
      this.descripcion = this.config.data.tarea.descripcion;
      this.proyectoId = this.config.data.proyectoId;
    } else {
      this.id = 0
      this.estado = '';
      this.nombre = '';
      this.grupo = '';
      this.responsable = '';
      this.prioridad = '';
      this.descripcion = ''
      this.proyectoId = this.config.data.proyectoId;
    }

  }


  Guardaruser() {
    // this.ref.close();
    const tarea = {
      id: this.id,
      estado: this.estado,
      nombre: this.nombre,
      grupo: this.grupo,
      responsable: this.responsable,
      prioridad: this.prioridad,
      descripcion: this.descripcion,
    }

    if (this.id > 0) {
      this.empresaService.actualizarModulo(tarea, this.proyectoId, this.id).pipe(
        tap((response: any) => {
          this.closeModal();
          Swal.fire({
            title: '¡Éxito!',
            text: 'Los Datos se registraron correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Aquí puedes agregar lógica adicional después de cerrar el modal.
          });
        }),
        catchError((error: any) => {
          console.error('Error al guardar datos', error);
          return of(error);  // Devuelve un observable para mantener la cadena viva si es necesario.
        })
      ).subscribe();

    } else {
      this.empresaService.guardarModulo(tarea, this.proyectoId).pipe(
        tap((response: any) => {
          this.closeModal();
          Swal.fire({
            title: '¡Éxito!',
            text: 'Los Datos se registraron correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Aquí puedes agregar lógica adicional después de cerrar el modal.
          });
        }),
        catchError((error: any) => {
          console.error('Error al guardar datos', error);
          return of(error);  // Devuelve un observable para mantener la cadena viva si es necesario.
        })
      ).subscribe();

      Swal.fire({
        title: '¡Éxito!',
        text: 'Los Datos se registraron correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => { });
    }
  }

  closeDialog() {
    this.visible = false;
  }


  closeModal() {
    this.ref.close({ register: false });
  }  
}

