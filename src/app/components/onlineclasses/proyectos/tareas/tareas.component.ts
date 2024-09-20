import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, of, switchMap } from 'rxjs';
import { GeneralService } from '../../service/general.service';
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
      console.log('Proyecto ID:', this.proyectoId);
      if (this.proyectoId) {
        this.proyectosService.getTareas(this.proyectoId).subscribe((response: any) => {
          console.log('Lista de tareas: ', response);
          this.tareas = response.data;
        });
      }
    });
  }

  navigateToNuevo(id: number) {
    if (id > 0) {
      this.proyectosService.getTarea(Number(this.proyectoId), id).subscribe((response: any) => {
        this.tarea = response.data;
        this.ref = this.dialogService.open(RegistrarTareaComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { tarea: this.tarea, proyectoId: this.proyectoId }
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
        data: { tarea: this.tarea, proyectoId: this.proyectoId}
      });

      this.ref.onClose.subscribe((dataFromDialog) => {
        this.getTareas();
      })
    }
  }

  navigateToGaleria(id: number) {
    this.proyectosService.getTarea(Number(this.proyectoId), id).subscribe((response: any) => {
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
    this.proyectosService.eliminarTarea(Number(this.proyectoId), id).pipe(
      switchMap(() => {
        console.log('Oferta laboral eliminada');
        return this.proyectosService.getTareas(this.proyectoId!);
      }),
      catchError((error) => {
        console.error('Error eliminando oferta laboral:', error);
        // Manejo del error, puedes retornar un array vacío o un valor alternativo
        return of({ data: [] });
      })
    ).subscribe(
      (response: any) => {
        console.log("Lista de ofertas laborales", response);
        this.tareas = response.data;
      }
    );
  }
}


