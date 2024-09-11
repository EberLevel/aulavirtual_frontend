import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { Parametro } from '../../../interface/general';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';	
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-reg-carrerastecnicas',
  templateUrl: './reg-carrerastecnicas.component.html',
  styleUrls: ['./reg-carrerastecnicas.component.scss']
})
export class RegCarrerastecnicasComponent implements OnInit {

  loading: boolean = false;
  parametroForm: FormGroup;
  estadosList: any[] = [];  // Para los planes de estudio

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,
    public config: DynamicDialogConfig,   
    private parametroService: GeneralService,
    private router: Router,
    private helpersService: HelpersService,
  ) {
    this.parametroForm = this.fb.group({
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      domain_id: [this.helpersService.getDominioId()],
      plan_de_estudios_id: ['', Validators.required]  // Agregamos el campo del Plan de Estudio
    });
  }

  ngOnInit() {
    this.listarPlanEstudio();  // Cargar los planes de estudio cuando el componente se inicializa
  }

  listarPlanEstudio(): Promise<void> {
    return new Promise((resolve, reject) => {
        this.parametroService.getEstadoDeCurso().subscribe(
            (response: any) => {
                console.log('Lista de Planes de Estudio:', response);
                // Mapear los datos obtenidos para que el dropdown los entienda
                this.estadosList = response.map((estado: any) => {
                    return {
                        name: estado.nombre,  // Nombre que se mostrará en el dropdown
                        value: estado.id      // Valor que se enviará al backend
                    };
                });
                resolve();
            },
            (error: any) => reject(error)
        );
    });
  }

  guardarParametro() {
    if (this.parametroForm.valid) {
      console.log('Formulario válido', this.parametroForm.value);
      this.parametroService.guardarCarreraTecnica(this.parametroForm.value).subscribe(
        (response: any) => {
          this.ref?.close();
          Swal.fire({
            title: '¡Éxito!',
            text: 'Los Datos se registraron correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            
          });
        },
        (error: any) => {
          console.error('Error al guardar el parámetro', error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error
        }
      );
    } else {
      console.error('Formulario inválido');
      // Aquí puedes manejar el caso de formulario inválido, como mostrar un mensaje de error
    }
  }

  closeModal(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    this.ref?.close();
  }
}