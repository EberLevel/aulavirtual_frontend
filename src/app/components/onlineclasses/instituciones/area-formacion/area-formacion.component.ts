import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../service/general.service';
import Swal from 'sweetalert2';	
import { AeAreaFormacionComponent } from './ae-area-formacion/ae-area-formacion.component';


@Component({
  selector: 'app-area-formacion',
  templateUrl: './area-formacion.component.html',
  styleUrls: ['./area-formacion.component.scss']
})
export class AreaFormacionComponent {


  loading: boolean = false;
  areaFormacionList: any[] = [];
  originalareaFormacionList: any[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private areasDeFormacionService: GeneralService,
  ) { }

  ngOnInit(): void {

    this.listarAreasDeFormacion();

  }

  listarAreasDeFormacion() { 
    this.areasDeFormacionService.getAreasDeFormacion().subscribe((response: any) => {
      
        this.areaFormacionList = response;
        this.originalareaFormacionList = [...response];
    });
}


  navigateAddCurso() {
    this.ref = this.dialogService.open(AeAreaFormacionComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'add' }
    });

    this.ref.onClose.subscribe((data: any) => {
      this.listarAreasDeFormacion();
    });
  }

  navigateToDetalle(data: any) {
    this.ref = this.dialogService.open(AeAreaFormacionComponent, {
      width: '80%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'ver', data: data }
    });

    this.ref.onClose.subscribe((data: any) => {
      this.listarAreasDeFormacion();
    });
  }

  navigateToEdit(data: any) {
    this.ref = this.dialogService.open(AeAreaFormacionComponent, {
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: { acciones: 'actualizar', data: data }
     });

    this.ref.onClose.subscribe((data: any) => {
      this.listarAreasDeFormacion();
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
        popup: 'custom-swal-popup'
      },
      didOpen: () => {
        const container = document.querySelector('.swal2-container');
        if (container) {
          container.setAttribute('style', 'z-index: 2147483647 !important');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.areasDeFormacionService.eliminarAreasDeFormacion(id).subscribe(
          response => {
            Swal.fire({
              title: 'Eliminado',
              text: 'La carrera técnica ha sido eliminada.',
              icon: 'success',
              showClass: {
                popup: `
                  background-color: #78CBF2;
                  color: white;
                  z-index: 10000!important;
                `
              },
              didOpen: () => {
                const container = document.querySelector('.swal2-container');
                if (container) {
                  container.setAttribute('style', 'z-index: 2147483647 !important');
                }
              }
            });
            this.listarAreasDeFormacion();
          },
          error => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la carrera técnica.',
              'error'
            );
          }
        );
      }
    });
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.areaFormacionList = [...this.originalareaFormacionList];
      return;
    }

    this.areaFormacionList = this.originalareaFormacionList.filter(area =>
      (area.nombre.toLowerCase().includes(filterValue)) 
    );
  }


}