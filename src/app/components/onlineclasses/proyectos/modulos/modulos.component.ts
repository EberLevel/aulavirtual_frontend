import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, of, switchMap } from 'rxjs';
import { GeneralService } from '../../service/general.service';
import { RegistrarModuloComponent } from './registrar-modulo/registrar-modulo.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent {
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
    this.getModulos();
  }

  getModulos() {
    this.route.paramMap.subscribe(params => {
      this.proyectoId = params.get('proyecto_id');
      if (this.proyectoId) {
        this.proyectosService.getModulos(this.proyectoId).subscribe((response: any) => {
          console.log('Lista de tareas: ', response);
          this.tareas = response.data;
        });
      }
    });
  }

  navigateToNuevo(id: number) {
    if (id > 0) {
      this.proyectosService.getModulo(Number(this.proyectoId), id).subscribe((response: any) => {
        this.tarea = response.data;
        this.ref = this.dialogService.open(RegistrarModuloComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: { tarea: this.tarea, proyectoId: this.proyectoId }
        });
        this.ref.onClose.subscribe((dataFromDialog) => {
          this.getModulos();
        });
      });
    } else {
      this.tarea = undefined;
      this.ref = this.dialogService.open(RegistrarModuloComponent, {
        width: '60%',
        styleClass: 'custom-dialog-header',
        data: { tarea: this.tarea, proyectoId: this.proyectoId}
      });

      this.ref.onClose.subscribe((dataFromDialog) => {
        this.getModulos();
      })
    }
  }

  verTareas(id: number) { }

  eliminar(id: number) {
    this.proyectosService.eliminarModulo(Number(this.proyectoId), id).pipe(
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
        this.getModulos();
      }
    );
  }
}


