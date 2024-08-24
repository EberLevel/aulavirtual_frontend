import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de importar estos módulos
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import Swal from 'sweetalert2';
import { PromocionService } from '../../../service/promocion.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-ae-area-promociones',
  templateUrl: './ae-area-promociones.component.html',
  styleUrls: ['./ae-area-promociones.component.scss']
})
export class AeAreaPromocionesComponent {
  
  // Declara el FormGroup
  parametroForm!: FormGroup;
  acciones: string = '';  // Acción actual (add, update, etc.)
  domain_id: any;

  constructor(
    private fb: FormBuilder,  // Inyecta FormBuilder para crear formularios
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,   
    private promocionesService: PromocionService,
    private helpersService: HelpersService
  ) {
    // Inicializa el FormGroup en el constructor
    this.parametroForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],  // Campo opcional
      fecha_inscripcion: ['', Validators.required]  // Campo requerido
    });

    // Obtén las acciones desde la configuración del componente
    this.acciones = this.config.data.acciones;
  }

  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId();
    console.log(this.domain_id)
    
    if (this.acciones === 'actualizar') {
      this.parametroForm.patchValue({
        nombre: this.config.data.data.nombre_promocion,
        descripcion: this.config.data.data.descripcion,
        fecha_inscripcion: this.config.data.data.fecha_inscripcion
      });
    }
  }

  guardarPromocion() {
    // Asegúrate de que el formulario es válido
    if (this.parametroForm.valid) {
      // Obtén la fecha y formatearla a 'YYYY-MM-DD'
      const fechaInscripcion = new Date(this.parametroForm.get('fecha_inscripcion')?.value).toISOString().split('T')[0];
    
      // Datos que se enviarán al backend
      const promocionData = {
        nombre_promocion: this.parametroForm.get('nombre')?.value,
        descripcion: this.parametroForm.get('descripcion')?.value,
        fecha_inscripcion: fechaInscripcion,  // Fecha en formato 'YYYY-MM-DD'
        domain_id: this.domain_id
      };
    
      // Muestra los datos en la consola antes de enviarlos
      console.log('Datos que se enviarán al backend:', promocionData);
    
      if (this.acciones === 'actualizar') {
        // Obtén el id de la promoción desde los datos recibidos
        const promocionId = this.config.data.data.id;
  
        // Asegúrate de que tienes un id válido
        if (promocionId) {
          this.promocionesService.actualizarPromocion(promocionData, promocionId).subscribe(
            (response) => {
              Swal.fire({
                title: '¡Éxito!',
                text: 'Promoción actualizada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.ref?.close();
            },
            (error) => {
              console.error('Error al actualizar la promoción', error);
              Swal.fire('Error', 'No se pudo actualizar la promoción.', 'error');
            }
          );
        } else {
          console.error('No se encontró el id de la promoción.');
        }
      } else {
        // Lógica para crear una nueva promoción
        this.promocionesService.guardarPromocion(promocionData).subscribe(
          (response) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Promoción guardada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.ref?.close();
          },
          (error) => {
            console.error('Error al guardar la promoción', error);
            Swal.fire('Error', 'No se pudo guardar la promoción.', 'error');
          }
        );
      }
    } else {
      console.error('Formulario inválido');
    }
  }
  

  closeModal(event: Event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del botón
    this.ref?.close();
  }
}
