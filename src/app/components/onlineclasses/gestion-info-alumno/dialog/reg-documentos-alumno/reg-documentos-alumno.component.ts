import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {GeneralService} from '../../../service/general.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DocumentoGestion, Parametro} from "../../../interface/general";
import {DocumentoGestionService} from "../../../service/documento-gestion.service";
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-reg-documentos-alumno',
    templateUrl: './reg-documentos-alumno.component.html',
    styleUrls: ['./reg-documentos-alumno.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class RegDocumentosAlumnoComponent implements OnInit{

    loading: boolean = false;
    parametroDatos: DocumentoGestion = new DocumentoGestion();

    acciones: string = 'register';
    domain_id=1;

    constructor(
        private router: Router,
        private ref: DynamicDialogRef,
        private cdr: ChangeDetectorRef,
        public config: DynamicDialogConfig,
        private documentoGestionService: DocumentoGestionService,
        private translate: TranslateService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private helperService: HelpersService,
    ) {
        this.acciones = config.data.action;
        if (this.acciones == 'edit'){
            this.parametroDatos = config.data.dato;
        }
    }

    ngOnInit(): void {
        this.domain_id = this.helperService.getDominioId();
        if (this.acciones == 'edit'){
            this.obtenerDocumetoGestion();
        } else {
            this.getCode();
        }
    }

    getCode() {
            this.documentoGestionService.getCode().subscribe(resp => {
                this.parametroDatos.codigo = resp.code;
            });
    }

    guardarDocumentoGestion() {
        this.parametroDatos.recursos = 'recursos';
        this.parametroDatos.domain_id = this.domain_id;  
        this.parametroDatos.user_id = this.helperService.getUserId();
    
        this.confirmationService.confirm({
            header: '¿Está seguro de agregar un nuevo registro?',
            message: 'El documento se visualizará en la tabla.',
            acceptLabel: 'Guardar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.documentoGestionService.guardarDocumentoGestion(this.parametroDatos).subscribe(
                    (res: any) => {
                        if (res) {
                            this.limpiar();
                            this.ref.close({ register: true });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar.', life: 1000 });
                        }
                    },
                    (error: any) => {
                        console.error("Error en el backend:", error.error);  
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el backend.', life: 3000 });
                    }
                );
            },
            reject: () => {}
        });
    }

    limpiar() {
        this.parametroDatos.codigo = null;
        this.parametroDatos.nombre = null;
        this.parametroDatos.costo = null;
        this.parametroDatos.descripcion = null;
        this.acciones = 'register';
    }


    obtenerDocumetoGestion() {
        if (this.parametroDatos.id)
        this.documentoGestionService.obtenerDocumetoGestion(this.parametroDatos.id, this.domain_id)
            .subscribe((resp: any) => {
                this.parametroDatos = resp;
            });
    }


    updateParametros(){
        this.confirmationService.confirm({
            header: '¿Está seguro de guardar los cambios?',
            message: 'Una vez guardado los cambios se cambiará los datos de manera permanente.',
            acceptLabel: 'Guardar Cambios',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.documentoGestionService.updateDocumentoGestion(this.parametroDatos).subscribe((res: any) => {
                    if (res){
                        this.limpiar();
                        this.ref.close({register: true});
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar el pedido. ', life: 3000 });
                    }
                });
            },
            reject: () => {}
        });
    }

    onUpload(event: any) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Archivo cargado correctamente'});
    }


    closeModal() {
        this.ref.close({register: false});
    }


}
