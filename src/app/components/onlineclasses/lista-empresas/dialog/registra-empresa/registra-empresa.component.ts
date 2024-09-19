import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../service/general.service';

@Component({
  selector: 'app-registra-empresa',
  templateUrl: './registra-empresa.component.html',
  styleUrls: ['./registra-empresa.component.scss']
})
export class RegistraEmpresaComponent {

  visible: boolean = false;
  id: number = 0;
  name: string = '';
  domain: string = '';
  database: string = 'BD';
  status: string = '1';
  rol_id: number= 8;
  domain_id: number= 0;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    public ref: DynamicDialogRef,
    private empresaService: GeneralService,
    public config: DynamicDialogConfig
  ) {

    if (this.config.data) {
      console.log(this.config.data);
      this.id = this.config.data.id;
      this.name = this.config.data.name;
      this.domain = this.config.data.domain;
      this.domain_id = this.config.data.domain_id;
    } else {
      this.id = 0
      this.name = ""

    }

  }


  Guardaruser() {
    // this.ref.close();
    const empresa = {
      name: this.name,
      domain: this.domain,
      database: this.database,
      status: this.status,
      rol_id: this.rol_id,
      domain_id: this.domain_id
    }
    console.log("empresa" , empresa)
    if (this.id > 0) {
      this.empresaService.actualizarEmpresa(empresa,this.id).subscribe(
        (response: any) => {
          this.closeModal();
          Swal.fire({
            title: '¡Éxito!',
            text: 'Los Datos se registraron correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {

          });
        },
        (error: any) => {
          console.error('Error al guardar el rol', error);
        }
      );

    } else {
      this.empresaService.guardarEmpresa(empresa).subscribe(
        (response: any) => {
          this.closeModal();
          Swal.fire({
            title: '¡Éxito!',
            text: 'Los Datos se registraron correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {

          });
        },
        (error: any) => {
          console.error('Error al guardar el rol', error);
        }
      );

      Swal.fire({
        title: '¡Éxito!',
        text: 'Los Datos se registraron correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {

      });
    }
  }

  closeDialog() {
    this.visible = false;
  }


  closeModal() {
    this.ref.close({ register: false });
  }
}
