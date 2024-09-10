import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../service/general.service';
import { catchError, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent {
  ref: DynamicDialogRef | undefined;
  proyectos: any[] = [];
  proyecto: any = {}

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private proyectosService: GeneralService
  ) {
    this.proyectosService.getProyectos().subscribe((response: any) => {
      console.log('Lista de ofertas laborales: ', response);
      this.proyectos = response.data;
    });
  }

  navigateToNuevo(id: number) {
    if (id > 0) {
      this.proyectosService.getOfertaLaboral(id).subscribe((response: any) => {
        this.proyecto = response.data;
        // this.ref = this.dialogService.open(RegistraOfertaLaboralComponent, {
        //   width: '60%',
        //   styleClass: 'custom-dialog-header',
        //   data: this.ofertaLaboral
        // });
        // this.ref.onClose.subscribe((dataFromDialog) => {
        //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //   this.router.onSameUrlNavigation = 'reload';
        // });
        console.log(this.proyecto)
      });
    } else {
      // this.ref = this.dialogService.open(RegistraOfertaLaboralComponent, {
      //   width: '60%',
      //   styleClass: 'custom-dialog-header',
      //   data: this.ofertaLaboral
      // });

      // this.ref.onClose.subscribe((dataFromDialog) => {
      //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //   this.router.onSameUrlNavigation = 'reload';
      // })
    }
  }

  verTareas(id: number) {}

  eliminar(id: number) {
    this.proyectosService.eliminarOfertaLaboral(id).pipe(
      switchMap(() => {
        console.log('Oferta laboral eliminada');
        return this.proyectosService.getOfertasLaborales();
      }),
      catchError((error) => {
        console.error('Error eliminando oferta laboral:', error);
        // Manejo del error, puedes retornar un array vacío o un valor alternativo
        return of({ data: [] });
      })
    ).subscribe(
      (response: any) => {
        console.log("Lista de ofertas laborales", response);
        this.proyectos = response.data;
      }
    );
  }
}

