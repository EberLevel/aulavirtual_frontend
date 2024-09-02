import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Capacitaciones, SelectDocente} from "../../../../interface/general";
import {CapacitacionesService} from "../../../../service/capacitaciones.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-reg-capacitaciones',
    templateUrl: './reg-capacitaciones.component.html',
    styleUrls: ['./reg-capacitaciones.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class RegCapacitacionesComponent implements OnInit {
    loading: boolean = true;
    parametroDatos: Capacitaciones = new Capacitaciones();
    acciones: string = 'register';
    hourFormat: string = '24';
    docenteGroupItemList: SelectDocente[] = [];
    itemSeleccionado?: SelectDocente | null;
    domain_id=1;
    estadoGroupItemList: SelectDocente[] = [];
    itemSeleccionadoEstado?: SelectDocente | null;
    dateValue: Date | undefined;
    public Editor = ClassicEditor as any;
    @ViewChild('ckeditor', { static: false }) ckeditor!: ElementRef;
    @ViewChild('ckeditor1', { static: false }) ckeditor1!: ElementRef;


    constructor(
        private router: Router,
        private ref: DynamicDialogRef,
        private cdr: ChangeDetectorRef,
        public config: DynamicDialogConfig,
        private capacitacionesService: CapacitacionesService,
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

    ngOnInit() {
        this.domain_id = this.helperService.getDominioId();
        this.listarDocentes(this.domain_id);
        if (this.acciones == 'edit'){
            setTimeout(()=>{
                this.itemSeleccionado = this.docenteGroupItemList.find((parametro:SelectDocente) => parametro.id === this.parametroDatos.docente) ?? ({} as SelectDocente);
                this.itemSeleccionadoEstado = this.estadoGroupItemList.find((parametro:SelectDocente) => parametro.id === this.parametroDatos.idEstado) ?? ({} as SelectDocente);
                this.dateValue = new Date(this.parametroDatos.fecha);
                this.loading= false;
            }, 3800)
            //this.obtenerDocumetoGestion();

        } else {
            this.getCode();
        }
    }

    /*ngAfterViewInit() {
        setTimeout(() => {
            this.resizeEditor();
        }, 400);
    }

    resizeEditor() {
        const editorElement = document.querySelector('.ck-toolbar');
        if (editorElement) {
            editorElement.setAttribute('style', 'width: 99.9%; height: 90px;');
        }
    }*/


    selecionarParametroItem(){
        if (this.itemSeleccionado && this.acciones == 'register'){
            this.parametroDatos.docente = this.itemSeleccionado?.id;
            if (this.itemSeleccionadoEstado)
            this.parametroDatos.idEstado = this.itemSeleccionadoEstado?.id;
        }
        if (this.acciones == 'edit') {
            this.parametroDatos.docente = this.itemSeleccionado?.id? this.itemSeleccionado?.id: null;
            this.parametroDatos.idEstado = this.itemSeleccionadoEstado?.id? this.itemSeleccionadoEstado?.id: null;
        }
    }

    getCode() {
            this.capacitacionesService.getCode().subscribe(resp => {
                this.parametroDatos.codigo = resp.code;
            });
    }

    listarDocentes(domain_id:any) {
        this.capacitacionesService.listarDocentes(domain_id).subscribe((response: any) => {
            this.docenteGroupItemList = response;
            this.estadoGroupItemList = response;
        })

    }

    guardarCapacitaciones(){
        if (this.dateValue)
        this.parametroDatos.fecha = this.getFormattedDate(this.dateValue);

        this.confirmationService.confirm({
            header: '¿Está seguro de agregar un nuevo registro?',
            message: 'El documento se visualizara en la tabla. ',
            acceptLabel: 'Guardar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.capacitacionesService.guardarCapacitacion(this.parametroDatos).subscribe((res: any) => {
                    if (res){
                        this.limpiar();
                        this.ref.close({register: true});
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar.', life: 1000 });
                    }
                });
            },
            reject: () => {}
        });
    }

    limpiar() {
        this.parametroDatos.codigo = null;
        this.parametroDatos.nombre = null;
        //this.parametroDatos.costo = null;
        //this.parametroDatos.descripcion = null;
        this.acciones = 'register';
    }

    getFormattedDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    obtenerDocumetoGestion() {
        if (this.parametroDatos.id)
        this.capacitacionesService.obtenerDocumetoGestion(this.parametroDatos.id)
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
                this.capacitacionesService.updateCapacitacion(this.parametroDatos).subscribe((res: any) => {
                    if (res){
                        this.limpiar();
                        this.ref.close({register: true});
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar. ', life: 3000 });
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
