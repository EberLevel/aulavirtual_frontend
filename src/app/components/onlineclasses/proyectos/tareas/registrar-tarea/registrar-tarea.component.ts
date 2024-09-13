import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../service/general.service';
import { catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-registrar-tarea',
  templateUrl: './registrar-tarea.component.html',
  styleUrls: ['./registrar-tarea.component.scss']
})
export class RegistrarTareaComponent {

  visible: boolean = false;
  id: number = 0;
  estado: string = '';
  nombre: string = '';
  grupo: string = '';
  responsable: string = '';
  prioridad: string = '';
  descripcion: string = '';
  proyectoId: number = 0;
  previewImages: string[] = [];
  base64Files: string[] = [];
  public Editor = ClassicEditor as any;
  @ViewChild('ckeditor', { static: false }) ckeditor!: ElementRef;

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
      this.base64Files = this.config.data.tarea.archivos?.map((elm: any) => elm.contenido);
      this.previewImages = [...this.base64Files]
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          this.previewImages.push(base64String);  // Para vista previa
          this.base64Files.push(base64String);   // Almacenar como base64
        };

        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1); // Eliminar la imagen de la previsualización
    this.base64Files.splice(index, 1);   // Eliminar la imagen del array de base64
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
      archivos: this.base64Files
    }

    if (this.id > 0) {
      this.empresaService.actualizarTarea(tarea, this.proyectoId, this.id).pipe(
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
          console.error('Error al guardar la oferta laboral', error);
          return of(error);  // Devuelve un observable para mantener la cadena viva si es necesario.
        })
      ).subscribe();

    } else {
      this.empresaService.guardarTarea(tarea, this.proyectoId).pipe(
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
          console.error('Error al guardar la oferta laboral', error);
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

