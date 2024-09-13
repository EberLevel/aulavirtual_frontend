import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../../service/general.service';
import { catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-registrar-proyecto',
  templateUrl: './registrar-proyecto.component.html',
  styleUrls: ['./registrar-proyecto.component.scss']
})
export class RegistraProyectoComponent {

  visible: boolean = false;
  id: number = 0;
  estado: string = '';
  nombre: string = '';
  public Editor = ClassicEditor as any;
  @ViewChild('ckeditor', { static: false }) ckeditor!: ElementRef;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    public ref: DynamicDialogRef,
    private proyectoService: GeneralService,
    public config: DynamicDialogConfig
  ) {

    if (this.config.data) {
      this.id = this.config.data.id;
      this.estado = this.config.data.estado;
      this.nombre = this.config.data.nombre;
    } else {
      this.id = 0
      this.estado = '';
      this.nombre = '';
    }

  }


  Guardaruser() {
    // this.ref.close();
    const ofertaLaboral = {
      id: this.id,
      estado: this.estado,
      nombre: this.nombre
    }

    if (this.id > 0) {
      this.proyectoService.actualizarProyecto(ofertaLaboral, this.id).pipe(
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
          console.error('Error al guardar proyecto', error);
          return of(error);  // Devuelve un observable para mantener la cadena viva si es necesario.
        })
      ).subscribe();

    } else {
      this.proyectoService.guardarProyecto(ofertaLaboral).pipe(
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
          console.error('Error al guardar proyecto', error);
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
