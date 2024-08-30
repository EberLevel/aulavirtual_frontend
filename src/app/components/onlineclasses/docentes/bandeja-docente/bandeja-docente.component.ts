import { Component, ElementRef, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { GeneralService } from '../../service/general.service';
import { Router } from '@angular/router';
import { RegDocenteComponent } from '../dialog/reg-docente/reg-docente.component';
import { DocenteService } from '../../service/docentes.service';
import { EditDocenteComponent } from '../dialog/edit-docente/edit-docente.component';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bandeja-docente',
  templateUrl: './bandeja-docente.component.html',
  styleUrls: ['./bandeja-docente.component.scss']
})
export class BandejaDocenteComponent {


  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') tabledt1: Table | undefined;
  docentes: any[] = [];
  loading: boolean = false;
  public idDocente:number = 0;
  public rolId: number = 0;

  ref: DynamicDialogRef | undefined;
  domain_id: number = 1;
  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private maestroService: GeneralService,
    private router: Router,
    private docenteService: DocenteService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.loading=true
    this.domain_id = this.helpersService.getDominioId();
    this.rolId = this.helpersService.getRolId();
    console.log("Dominio" + this.domain_id)
    const docenteId = this.helpersService.getDocenteId();

    if (this.rolId === 17 && docenteId) {
        this.docenteService.getLoggedDocente(docenteId, this.domain_id).subscribe(
            (res: any) => {
              this.actualizarDocente(res);
            },
            (error: any) => {
              this.loading=false
                console.log('Error al obtener el docente logueado:', error);
            }
        );
    }
    this.loading=false
    this.listarDocente();
  }
  listarDocente() {
    this.loading = true;
    const rolId = this.helpersService.getRolId();
    
    if (rolId === 17) {
      const docenteId = this.helpersService.getDocenteId(); 
      this.docenteService.getLoggedDocente(docenteId, this.domain_id).subscribe(
        (res: any) => {
          this.docentes = [res]; 
          console.log(res);
        }, 
        (error: any) => {
          console.log(error);
        }
      );
      this.loading = false;
    } else {
      this.docenteService.listarDocentes(this.domain_id).subscribe({
        next: (response) => {
          this.docentes = response.Datos;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al listar docentes:', error);
          this.loading = false;
        }
      });
    }
  
    // Convertir las imágenes a base64
    this.docentes.forEach((item: any) => {
      this.convertImageToBase64(item.foto, (base64: string) => {
        item.fotoBase64 = base64;
      });
    });
  
    console.log(this.docentes);
  }
  
  

  buscarDocente(){
    // this.docenteService.buscarDocentes(this).subscribe((res:any)=>{},(error:any)=>{});
  }

  eliminarDocente(id: number){
      Swal.fire({
        title: "Deseas eliminar el docente?",
        text: "Estos cambios son inreversibles!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          this.docenteService.eliminarDocentes(id).subscribe(
            (res:any)=>{
              console.log(res);
              this.listarDocente();
              Swal.fire({
                title: "Eliminado correctamente!",
                // text: ".",
                icon: "success"
              });
            },(error:any)=>{
              console.log(error);
            });
        }
      });

    console.log(id)
  }
  convertImageToBase64(url: string, callback: (base64: string) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result as string);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

   // Convertir las imágenes a base64
  
  actualizarDocente(datos: any){

    this.ref = this.dialogService.open(EditDocenteComponent, {  
      width: '60%',
      styleClass: 'custom-dialog-header',
      data: {
        "id": datos.id,
        "codigo": datos.codigo,
        "nombres": datos.nombres,
        "usuario": datos.usuario,
        "clave": datos.clave,
        "celular": datos.celular,
        "profesion": datos.profesion,
        "email": datos.email,
        "tipo_documento": datos.tipo_documento,
        "doc_identidad": datos.doc_identidad,
        "fecha_nacimiento": datos.fecha_nacimiento,
        "edad": datos.edad,
        "genero": datos.genero,
        "roles": 'seguridad,aula_virtual'
      }
    });

    this.ref.onClose.subscribe((data: any) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.listarDocente();
    });
  }
  cargaInicial(): void {
    const esDocente = this.helpersService.getRolId() === 17;
    console.log("aaaa")  
    console.log(esDocente)
  }

  navigateToNuevo() {
    this.ref = this.dialogService.open(RegDocenteComponent, {  
      width: '60%',
      styleClass: 'custom-dialog-header'
    });

    this.ref.onClose.subscribe((data: any) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.listarDocente();
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    )
  }

  onRowSelect(event: any) {
    
    console.log("Organo-colegaido-sect");
  }

  onRowUnselect(event: any) {
    
    
  }

}
