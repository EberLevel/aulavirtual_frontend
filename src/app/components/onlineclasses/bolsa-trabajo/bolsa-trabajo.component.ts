import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../service/general.service';
import { catchError, of, switchMap } from 'rxjs';
import { RegistraOfertaLaboralComponent } from './dialog/registra-oferta-laboral/registra-oferta-laboral.component';

@Component({
  selector: 'app-bolsa-trabajo',
  templateUrl: './bolsa-trabajo.component.html',
  styleUrls: ['./bolsa-trabajo.component.scss']
})
export class BolsaTrabajoComponent {
  ref: DynamicDialogRef | undefined;
  ofertasLaborales: any[] = [];
  ofertaLaboral: any = {}

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private ofertasLaboralesService: GeneralService
  ) {
    this.ofertasLaboralesService.getOfertasLaborales().subscribe((response: any) => {
      console.log('Lista de ofertas laborales: ', response);
      this.ofertasLaborales = response.data;
    });
  }

  navigateToNuevo(id: number) {
    if (id > 0) {
      this.ofertasLaboralesService.getOfertaLaboral(id).subscribe((response: any) => {
        this.ofertaLaboral = response.data;
        this.ref = this.dialogService.open(RegistraOfertaLaboralComponent, {
          width: '60%',
          styleClass: 'custom-dialog-header',
          data: this.ofertaLaboral
        });
        this.ref.onClose.subscribe((dataFromDialog) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
        });
        console.log(this.ofertaLaboral)
      });
    } else {
      this.ref = this.dialogService.open(RegistraOfertaLaboralComponent, {
        width: '60%',
        styleClass: 'custom-dialog-header',
        data: this.ofertaLaboral
      });

      this.ref.onClose.subscribe((dataFromDialog) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      })
    }
  }

  eliminar(id: number) {
    this.ofertasLaboralesService.eliminarOfertaLaboral(id).pipe(
      switchMap(() => {
        console.log('Oferta laboral eliminada');
        return this.ofertasLaboralesService.getOfertasLaborales();
      }),
      catchError((error) => {
        console.error('Error eliminando oferta laboral:', error);
        // Manejo del error, puedes retornar un array vacío o un valor alternativo
        return of({ data: [] });
      })
    ).subscribe(
      (response: any) => {
        console.log("Lista de ofertas laborales", response);
        this.ofertasLaborales = response.data;
      }
    );
  }
}
