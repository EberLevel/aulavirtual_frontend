import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import esLocale from '@fullcalendar/core/locales/es'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocenteService } from '../../../service/docentes.service';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';

interface tipodoc {
  name: string;
  value: number;
  code: string;
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface tipoGenero {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reg-docente',
  templateUrl: './reg-docente.component.html',
  styleUrls: ['./reg-docente.component.scss'],
  providers: [MessageService]
})
export class RegDocenteComponent {

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

  public DocenteForm: FormGroup;
  public selectedFile: File | null = null;
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
    this.domain_id = this.helpersService.getDominioId();
    this.DocenteForm = this.formBuilder.group({
      codigo: ['',Validators.required],
      nombres: ['',Validators.required],
      contraseña: ['', Validators.required],
      celular: ['', Validators.required],
      profesion: ['', Validators.required],
      genero: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      doc_identidad: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      email: ['', Validators.required],
      foto: ['']
    });
  }

  ngOnInit() {
    this.tipodocu = [
      { name: 'DNI', value:1, code: 'NY' },
      { name: 'PASAPORTE', value:2, code: 'RM' }
      
    ];

    this.tipoGenero = [
      { name: 'Masculino', value:1 },
      { name: 'Femenino', value:2}
    ]

  
    if (this.translate) {
      this.translateChange('es'); 
    } else {
      console.error('TranslateService is not initialized.');
    }

    
}


registrarDocente() {
  this.DocenteForm.patchValue({
    tipo_documento: this.tipoDocumentoSeleccionado?.name,
    genero: this.tipoGeneroSeleccionado?.name
  });

  if (this.DocenteForm.invalid) {
    return;
  }

  const docenteData = {
    codigo: this.DocenteForm.get('codigo')?.value,
    nombres: this.DocenteForm.get('nombres')?.value,
    contraseña: this.DocenteForm.get('contraseña')?.value,
    celular: this.DocenteForm.get('celular')?.value,
    profesion: this.DocenteForm.get('profesion')?.value,
    tipo_documento: this.DocenteForm.get('tipo_documento')?.value,
    doc_identidad: this.DocenteForm.get('doc_identidad')?.value,
    fecha_nacimiento: this.DocenteForm.get('fecha_nacimiento')?.value,
    genero: this.DocenteForm.get('genero')?.value,
    roles: 'seguridad,aula_virtual',
    email: this.DocenteForm.get('email')?.value,
    domain_id: this.domain_id,
    foto: this.DocenteForm.get('foto')?.value // La imagen en base64
  };

  // Mostrar el JSON en la consola para verificar
  console.log('JSON enviado al backend:', JSON.stringify(docenteData, null, 2));

  // Enviar los datos como JSON
  this.docenteService.registrarDocentes(docenteData).subscribe(
    (res: any) => {
      if (res.Exito) {
        Swal.fire({
          title: 'Registrado correctamente!',
          icon: 'success'
        });
        this.closeModal();
      }
    },
    (error: any) => {
      console.error('Error en la solicitud HTTP:', error);
      this.helpersService.showErrorMessage('Error al registrar');
    }
  );
}



onFileChange(event: any) {
  const file = event.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    this.DocenteForm.patchValue({
      foto: reader.result
    });
  };
  
  reader.readAsDataURL(file);
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

closeModal(){
  this.ref.close({register: false});
}


}
