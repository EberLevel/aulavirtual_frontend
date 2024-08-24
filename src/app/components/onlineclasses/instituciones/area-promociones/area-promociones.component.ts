import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';	
import { HelpersService } from 'src/app/helpers.service';
import { AeAreaPromocionesComponent } from './ae-area-promociones/ae-area-promociones.component';
import { PromocionService } from '../../service/promocion.service';

@Component({
  selector: 'app-area-promociones',
  templateUrl: './area-promociones.component.html',
  styleUrls: ['./area-promociones.component.scss']
})
export class AreaPromocionesComponent {
  loading: boolean = false;
  promocionesList: any[] = [];
  originalPromocionesList: any[] = [];
  ref: DynamicDialogRef | undefined;

  domain_id!: number;  // Almacenará el domain_id desde el HelpersService

  constructor(
    private dialogService: DialogService,
    private promocionesService: PromocionService,  // Servicio de promoción
    private helpersService: HelpersService  // Importar tu servicio de helpers
  ) { }

  ngOnInit(): void {
    // Obtener el domain_id desde el HelpersService
    this.domain_id = this.helpersService.getDominioId();
    console.log(this.domain_id)

    // Solo listar promociones si hay un domain_id válido
    if (this.domain_id) {
      this.listarPromocionesPorDominio(this.domain_id);
    } else {
      Swal.fire('Error', 'No se encontró un dominio válido.', 'error');
    }
  }

  listarPromocionesPorDominio(domain_id: number) {
    this.loading = true;
    this.promocionesService.getPromocionesByDomainId(domain_id).subscribe(
      (response: any) => {
        this.promocionesList = response.data;  // Asigna el array de promociones
        this.originalPromocionesList = [...response.data];  // Copia original para filtro
        this.loading = false;
      },
      error => {
        this.loading = false;
        Swal.fire('Error', 'Hubo un problema al cargar las promociones.', 'error');
      }
    );
  }

  navigateAddPromocion() {
    this.ref = this.dialogService.open(AeAreaPromocionesComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'add' } 
    });

    this.ref.onClose.subscribe((data: any) => {
      this.listarPromocionesPorDominio(this.domain_id);
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(AeAreaPromocionesComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'actualizar', data: data }
     });

    this.ref.onClose.subscribe((data: any) => {
      this.listarPromocionesPorDominio(this.domain_id);
    });
  }



  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.promocionesList = [...this.originalPromocionesList];
      return;
    }

    this.promocionesList = this.originalPromocionesList.filter(promocion =>
      (promocion.nombre_promocion.toLowerCase().includes(filterValue)) 
    );
  }
}
