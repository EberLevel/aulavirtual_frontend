import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Miembro, Pagos } from '../../interface/general';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PagoService } from '../../service/pago.service';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/helpers.service';
import { error } from 'console';
import { globSync } from 'fs';
import { AlumnoService } from '../../service/alumno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-pago-modal',
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PagoModalComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') tabledt1: Table | undefined;
  @Input() miembro: Miembro[] = [];
  @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

  ref: DynamicDialogRef | undefined;

  ciclosList: any[] = [];
  domain_id: number = 1;

  
  showModalPagos: boolean = false
  pagoAlumnosList2: any[] = []
    pagosPendientes: any[] = []
  voucherBase64: string = ''; 
  uploadForm!: FormGroup;
  alumno_id: any;

  
  newPago: any = {
      nombre: '',
      descripcion: '',
      monto: null,
      fecha_pago: null,
      fecha_vencimiento: null,
      estado_id: null,
  };

  constructor(
      private commonService: CommonService,
      private messageService: MessageService,
      private helpersService: HelpersService,



      private alumnoService: AlumnoService,
      private fb: FormBuilder,


      
  ) {

    this.uploadForm = this.fb.group({
      pago_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      this.domain_id = this.helpersService.getDominioId();
      this.alumno_id = this.helpersService.getAlumnoId();
      console.log('this.alumno', this.alumno_id);
      this.getCiclosDropdown();
        this.listarPagoDeAlumno();
        this.cargarSelectPagos();
  }

  openModalPagos() {
    this.showModalPagos = true;
}

getCiclosDropdown() {
  this.commonService.getCiclosDropdown(this.domain_id).subscribe(
      (response) => {
          this.ciclosList = response.map((ciclo: any) => {
              return { name: ciclo.nombre, value: ciclo.id };
          });
      },
      (error) => console.error('Error obteniendo ciclos', error)
  );
}

listarPagoDeAlumno() {
  this.alumnoService.listarPagoDeAlumno(this.alumno_id , this.domain_id).subscribe(
      (response: any) => {
          const pagos = response

          console.log(pagos);
          
          this.pagoAlumnosList2 = pagos["pagos"]
          this.cargarSelectPagos()
      })
}

cargarSelectPagos() {  
  this.pagosPendientes = this.pagoAlumnosList2.filter((pago: any) => pago.estado_id === 1);
  console.log('Pagos pendientes:', this.pagosPendientes);
}


    // Manejar la selección del archivo y convertirlo a Base64
    onFileSelect(event: any) {
      const file = event.target.files[0];
      if (file) {
          this.voucherBase64 = file; // Convertir el archivo a Base64
          console.log('line 423');
          
          console.log(this.voucherBase64);
      }
      }
  
    // Subir el comprobante
      onSubmit() {
  
      console.log(this.voucherBase64);
      
      if (this.uploadForm.valid && this.voucherBase64) {
  
          const formData = new FormData();
          formData.append('pago_id', this.uploadForm.get('pago_id')?.value);
          formData.append('voucher_pago', this.voucherBase64); // Agregar el archivo seleccionado
          formData.append('alumno_id', this.alumno_id.toString()); // Añadir otros datos necesarios
          formData.append('domain_id', this.domain_id.toString());
  
        this.alumnoService.subirComprobante(formData).subscribe(
          (response) => {
          
            this.uploadForm.reset(); // Reiniciar formulario
            this.voucherBase64 = ''; // Limpiar imagen
             // Recargar pagos pendientes
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'El pago se subio correctamente!',
              life: 3000,
              });
              console.log('modal');
              
              this.listarPagoDeAlumno();
          },
          (error) => {
            console.error('Error al subir comprobante:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Error al subir el pago',
              life: 3000,
              });
          }
        );
      } else {
        alert('Por favor, completa todos los campos antes de enviar.');
      }
      }
}
