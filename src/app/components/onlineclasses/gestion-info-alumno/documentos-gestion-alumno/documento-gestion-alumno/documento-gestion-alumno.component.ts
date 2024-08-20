import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { GeneralService } from '../../../service/general.service';
import { Router } from '@angular/router';
import { Base, DocumentoGestion, Miembro } from '../../../interface/general';
import { RegDocumentosAlumnoComponent } from '../../dialog/reg-documentos-alumno/reg-documentos-alumno.component';
import { DocumentoGestionService } from '../../../service/documento-gestion.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { H } from '@fullcalendar/core/internal-common';
import { HelpersService } from 'src/app/helpers.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-documento-gestion-alumno',
    templateUrl: './documento-gestion-alumno.component.html',
    styleUrls: ['./documento-gestion-alumno.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class DocumentoGestionAlumnoComponent implements OnInit {
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;
    @Input() miembro: Miembro[] = [];
    @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

    ref: DynamicDialogRef | undefined;
    dominio_id: number = 1;
    DocumnetoGestionList: DocumentoGestion[] = [];

    constructor(
        private dialogService: DialogService,
        private documentoGestionService: DocumentoGestionService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private helpersService: HelpersService
    ) {}

    ngOnInit(): void {
        this.dominio_id = this.helpersService.getDominioId();
        this.listarDocumentoGestion();
    }

    listarDocumentoGestion() {
        const userId = this.helpersService.getUserId(); // Obtiene el ID del usuario logueado
        this.documentoGestionService
            .listarDocumentosAlumno(this.dominio_id, userId)
            .subscribe((response: any) => {
                console.log('Documentos del alumno:', response);
                this.DocumnetoGestionList = response;
            });
    }

    navigateToNuevo() {
        this.ref = this.dialogService.open(RegDocumentosAlumnoComponent, {
            width: '60%',
            styleClass: 'custom-dialog-header',
            data: { action: 'register' },
        });

        this.ref.onClose.subscribe((data: any) => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';

            if (data) {
                if (data.register == true) {
                    this.listarDocumentoGestion();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Se registro con éxito.',
                        life: 3000,
                    });
                }
            }
        });
    }

    openFormEditar(parametro: DocumentoGestion) {
        let parametroSeleccionado = Object.assign({}, parametro);
        const ref = this.dialogService.open(RegDocumentosAlumnoComponent, {
            header: 'Parámetros',
            contentStyle: { 'min-height': '10rem' },
            width: '60%',
            data: { action: 'edit', dato: parametroSeleccionado },
        });
        ref.onClose.subscribe((data: any) => {
            if (data) {
                if (data.register == true) {
                    this.listarDocumentoGestion();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Se modifico con éxito.',
                        life: 3000,
                    });
                }
            }
        });
    }

    deleteDocumentoGestion(id: number) {
        this.confirmationService.confirm({
            header: '¿Está seguro de eliminar el registro?',
            message:
                'Una vez guardado los cambios se eliminará los datos de manera permanente.',
            acceptLabel: 'Guardar Cambios',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.documentoGestionService
                    .deleteDocumentoGestion(id)
                    .subscribe((res: any) => {
                        console.log('UPDATE', res);
                        if (res) {
                            this.listarDocumentoGestion();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Éxito',
                                detail: 'Se elimino con éxito.',
                                life: 3000,
                            });
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Error al eliminar. ',
                                life: 3000,
                            });
                        }
                    });
            },
            reject: () => {},
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    editarMiembro() {}

    eliminarMiembro() {}

    agregarcurso() {}
    onRowSelect(event: any) {
        console.log('Organo-colegaido-sect');
    }

    onRowUnselect(event: any) {}
}
