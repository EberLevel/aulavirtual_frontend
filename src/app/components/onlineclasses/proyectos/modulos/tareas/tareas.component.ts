import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, of, switchMap } from 'rxjs';
import { GeneralService } from '../../../service/general.service';
import { RegistrarTareaComponent } from './registrar-tarea/registrar-tarea.component';
import { GaleriaComponent } from './galeria/galeria.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent {
  ref: DynamicDialogRef | undefined;
  tareas: any[] = [];
  tarea: any;
  proyectoId: string | null = null;
  moduloId: string | null = null;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private proyectosService: GeneralService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Accede al `proyecto_id` desde los parámetros de la ruta
    this.getTareas();
  }

  getTareas() {
    this.route.paramMap.subscribe(params => {
      this.proyectoId = params.get('proyecto_id');
      this.moduloId = params.get('modulo_id');
      console.log('Proyecto ID:', this.proyectoId, this.moduloId);
      if (this.proyectoId && this.moduloId) {
        this.proyectosService.getTareas(this.proyectoId, this.moduloId).subscribe((response: any) => {
          console.log('Lista de tareas: ', response);
          this.tareas = response.data;
        });
      }
    });
  }

  navigateToNuevo(id: number) {
    if (id > 0) {
      this.proyectosService.getTarea(Number(this.proyectoId), Number(this.moduloId), id).subscribe((response: any) => {
        this.tarea = response.data;
        this.ref = this.dialogService.open(RegistrarTareaComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { tarea: this.tarea, proyectoId: this.proyectoId, moduloId: this.moduloId }
        });
        this.ref.onClose.subscribe((dataFromDialog) => {
          this.getTareas();
        });
      });
    } else {
      this.tarea = undefined;
      this.ref = this.dialogService.open(RegistrarTareaComponent, {
        width: '60%',
        styleClass: 'custom-dialog-header',
        data: { tarea: this.tarea, proyectoId: this.proyectoId, moduloId: this.moduloId }
      });

      this.ref.onClose.subscribe((dataFromDialog) => {
        this.getTareas();
      })
    }
  }

  navigateToGaleria(id: number) {
    this.proyectosService.getTarea(Number(this.proyectoId), Number(this.moduloId), id).subscribe((response: any) => {
      this.tarea = response.data;
      this.ref = this.dialogService.open(GaleriaComponent, {
        width: '60%',
        styleClass: 'custom-dialog-header',
        data: { tarea: this.tarea, proyectoId: this.proyectoId }
      });
      this.ref.onClose.subscribe((dataFromDialog) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      });
    });
  }

  verTareas(id: number) { }

  eliminar(id: number) {
    this.proyectosService.eliminarTarea(Number(this.proyectoId), Number(this.moduloId), id).pipe(
      switchMap(() => {
        console.log('Oferta laboral eliminada');
        return this.proyectosService.getModulos(this.proyectoId!);
      }),
      catchError((error) => {
        console.error('Error eliminando oferta laboral:', error);
        // Manejo del error, puedes retornar un array vacío o un valor alternativo
        return of({ data: [] });
      })
    ).subscribe(
      (response: any) => {
        console.log("Lista de ofertas laborales", response);
        // this.tareas = response.data;
        this.getTareas()
      }
    );
  }
}


