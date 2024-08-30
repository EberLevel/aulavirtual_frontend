import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { MessageService } from 'primeng/api';
import esLocale from '@fullcalendar/core/locales/es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { TranslateService } from '@ngx-translate/core';
import { DocenteService } from '../../../service/docentes.service';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';

interface tipodoc {
  name: string;
  value: number;
  code: string;
}

interface tipoGenero {
  name: string;
  value: number;
}

@Component({
  selector: 'app-edit-docente',
  templateUrl: './edit-docente.component.html',
  styleUrls: ['./edit-docente.component.scss'],
  providers: [MessageService]
})
export class EditDocenteComponent {
  tipodocu!: tipodoc[];
  tipoDocumentoSeleccionado: tipodoc | undefined;
  tipoDoc: tipodoc | undefined;
  tipoGenero!: tipoGenero[];
  tipoGeneroSeleccionado: tipoGenero | undefined;
  domain_id: number = 1;
  fechanacimiento!: Date | null;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
  };
  translateService: any;

  public selectedFile: File | null = null;
  public base64: string | null = null;
  public formSubmitted: boolean = false;
  public DocenteForm: FormGroup;
  constructor(
    private router: Router,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,
    public config: DynamicDialogConfig,
    private parametroService: GeneralService,
    private translate: TranslateService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private docenteService: DocenteService,
    private helpersService: HelpersService,
  ) {
    this.DocenteForm = this.formBuilder.group({
      id: [0],
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      clave: ['', Validators.required],
      celular: ['', Validators.required],
      profesion: ['', Validators.required],
      edad: [0, Validators.required],
      genero: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      doc_identidad: ['', Validators.required],
      vinculo_laboral: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      email: ['', Validators.required], 
      roles: ['']
    });
  }

  ngOnInit() {
    console.log(this.config.data);
    this.domain_id = this.helpersService.getDominioId();
    this.tipodocu = [
      { name: 'DNI', value: 1, code: 'NY' },
      { name: 'PASAPORTE', value: 2, code: 'RM' }
    ];

    this.tipoGenero = [
      { name: 'Masculino', value: 1 },
      { name: 'Femenino', value: 2 }
    ];

    const tipoDoc = this.tipodocu.find(item => item.name == this.config.data.tipo_documento);
    if (tipoDoc) {
      this.tipoDocumentoSeleccionado = { code: tipoDoc.code, name: tipoDoc.name, value: tipoDoc.value };
    }

    const tipoGenero = this.tipoGenero.find(item => item.name == this.config.data.genero);
    if (tipoGenero) {
      this.tipoGeneroSeleccionado = { name: tipoGenero.name, value: tipoGenero.value };
    }

    // Cargar datos en el formulario, incluyendo el email
    this.base64 = this.config.data.foto;
    this.DocenteForm.patchValue({
      id: this.config.data.id,
      codigo: this.config.data.codigo,
      nombres: this.config.data.nombres,
      clave: this.config.data.clave,
      celular: this.config.data.celular,
      profesion: this.config.data.profesion,
      tipo_documento: this.config.data.tipo_documento,
      doc_identidad: this.config.data.doc_identidad,
      vinculo_laboral: this.config.data.vinculo_laboral,
      fecha_nacimiento: this.config.data.fecha_nacimiento,
      edad: this.config.data.edad,
      genero: this.config.data.genero,
      email: this.config.data.email,
      roles: this.config.data.roles,
      domain_id: this.domain_id
    });

    if (this.translate) {
      this.translateChange('es');
    } else {
      console.error('TranslateService is not initialized.');
    }
}

actualizarDocente() {
  this.formSubmitted = true;

  const docenteData: any = {
      id: this.DocenteForm.get('id')?.value,
      codigo: this.DocenteForm.get('codigo')?.value,
      nombres: this.DocenteForm.get('nombres')?.value,
      celular: this.DocenteForm.get('celular')?.value,
      profesion: this.DocenteForm.get('profesion')?.value,
      tipo_documento: this.tipoDocumentoSeleccionado?.name,
      doc_identidad: this.DocenteForm.get('doc_identidad')?.value,
      fecha_nacimiento: this.DocenteForm.get('fecha_nacimiento')?.value,
      genero: this.tipoGeneroSeleccionado?.name,
      roles: 'seguridad,aula_virtual',
      email: this.DocenteForm.get('email')?.value,
      domain_id: this.domain_id
  };

  // Solo agregar la clave si está presente
  const claveValue = this.DocenteForm.get('clave')?.value;
  if (claveValue) {
      docenteData.clave = claveValue;
  }

  // Solo agregar la foto si se ha seleccionado una nueva o ya existe una imagen base64
  if (this.base64) {
      docenteData.foto = this.base64;
  }

  this.docenteService.actualizarDocentes(docenteData).subscribe(
      (res: any) => {
          Swal.fire('Éxito', 'Docente actualizado correctamente', 'success');
          this.closeModal();
      },
      (error: any) => {
          Swal.fire('Error', 'Error al actualizar el docente', 'error');
      }
  );
}


onFileChange(event: any) {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64 = reader.result as string; // Convertir a base64
    };
    reader.readAsDataURL(file);
  }
}




  cambiarIdioma() {
    this.translateService.use('es');
  }

  translateChange(lang: string): void {
    if (this.translate) {
      this.translate.use(lang);
    } else {
      console.error('TranslateService is not initialized.');
    }
  }

  onUpload(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Archivo cargado correctamente' });
  }

  closeModal() {
    this.ref.close({ mensaje: 'cerrando' });
  }

}
