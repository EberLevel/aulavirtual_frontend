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

@Component({
    selector: 'app-pago',
    templateUrl: './pago.component.html',
    styleUrls: ['./pago.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class PagoComponent implements OnInit {
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;
    @Input() miembro: Miembro[] = [];
    @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

    ref: DynamicDialogRef | undefined;

    pagosList: Pagos[] = [];
    selectedPago: any = null;
    alumnosList: any[] = [];
    selectedAlumno: any = null;
    selectedAlumnos: any[] = [];
    pagoAlumnosList: { [key: string]: any } = {};
    selectedPagoAlumnos: any[] = [];
    ciclosList: any[] = [];
    selectedCiclo: any = null;
    searchText: string = ''; // Para el texto de búsqueda
    filteredAlumnos: any[] = []; // Lista filtrada de alumnos
    filteredPagoAlumnos: any[] = []; // Lista filtrada de alumnos
    estadosList: any[] = [];
    showModal: boolean = false;
    domain_id: number = 1;
    showCreatePagoModal: boolean = false;
    showPagoAlumnoModal: boolean = false;
    showVoucherModal: boolean = false;

    newPago: any = {
        nombre: '',
        descripcion: '',
        monto: null,
        fecha_pago: null,
        fecha_vencimiento: null,
        estado_id: null,
    };

    constructor(
        private dialogService: DialogService,
        private pagoService: PagoService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private helpersService: HelpersService
    ) {}

    ngOnInit(): void {
        this.domain_id = this.helpersService.getDominioId();
        console.log('this.domain_id ', this.domain_id);
        this.listarPagos();
        this.listarCiclos();
        this.listarEstados();
    }

    listarPagos(): void {
        this.pagoService
            .listarPagos(this.domain_id)
            .subscribe((response: any) => {
                this.pagosList = response;
                console.log('Pagos:', this.pagosList);
            });
    }

    listarCiclos(): void {
        // Simula la lista de ciclos o haz una llamada al backend
        this.pagoService
            .listarCiclos(this.domain_id)
            .subscribe((response: any[]) => {
                this.ciclosList = response.map((ciclo) => ({
                    label: ciclo.nombre,
                    value: ciclo.id,
                }));

                console.log('ciclos: ', this.ciclosList);
            });
    }

    listarEstados(): void {
        this.estadosList = [
            {
                label: 'EN PROCESO',
                value: 2,
            },
            {
                label: 'VENCIDO',
                value: 19,
            },
            {
                label: 'COMPLETADO',
                value: 20,
            },
        ];
    }

    listarAlumnos(): void {
        this.pagoService
            .listarAlumnos(this.domain_id)
            .subscribe((response: any) => {
                this.alumnosList = response;

                console.log('alumnos: ', this.alumnosList);

                this.filteredAlumnos = [...this.alumnosList];
                console.log('alumnos filtro: ', this.filteredAlumnos);
            });

        // Aplica filtro por texto si hay un valor de búsqueda
    }

    listarPagoVinculadoPorAlumno(): void {
        this.pagoService
            .listarPagoVinculadoPorAlumno(this.domain_id, this.selectedPago.id)
            .subscribe((response: any) => {
                this.pagoAlumnosList = response;

                if (this.pagoAlumnosList['alumnos'].length === 0) {
                    return this.messageService.add({
                        severity: 'error',
                        summary: 'error',
                        detail: 'No cuenta con registros',
                        life: 3000,
                    });
                }
                this.showPagoAlumnoModal = true;

                this.filteredPagoAlumnos = [...this.pagoAlumnosList['alumnos']];
                console.log('alumnos pago filtro: ', this.filteredPagoAlumnos);
            });
    }

    guardarPago(): void {
        const formattedPago = {
            ...this.newPago,
            fecha_pago: this.newPago.fecha_pago
                ? this.formatDate(this.newPago.fecha_pago)
                : null,
            fecha_vencimiento: this.newPago.fecha_vencimiento
                ? this.formatDate(this.newPago.fecha_vencimiento)
                : null,
                domain_id: this.domain_id
        };
        console.log('Pago que se enviará al backend:', formattedPago);
        this.pagoService.guardarPago(formattedPago).subscribe(
            (response) => {
                console.log('Pago guardado con éxito:', response);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'El pago se guardó correctamente.',
                    life: 3000,
                });

                this.showCreatePagoModal = false; // Cierra el modal
                this.resetForm();
                this.listarPagos(); // Actualiza la lista de pagos (si tienes este método)
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ocurrió un error al guardar el pago. Inténtalo nuevamente.',
                    life: 3000,
                });
                console.error('Error al guardar el pago:', error);
            }
        );
    }

    vincularAlumnos(): void {
        // Realiza la lógica para vincular los alumnos seleccionados al pago
        console.log(
            'Vinculando los alumnos:',
            this.selectedAlumnos,
            'al pago:',
            this.selectedPago
        );

        const alumnos = this.selectedAlumnos.map((alumno) => alumno.id);
        const pago_id = this.selectedPago.id;
        const pagoAlumnos = {
            alumnos,
            pago_id,
            estado: 1,
        };

        this.pagoService.vincularPagoAlumnos(pagoAlumnos).subscribe(
            (response) => {
                console.log(response);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Se vinculo el pago correctamente.',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ocurrió un error al realizar la vinculacion.',
                    life: 3000,
                });
                console.error('Error al vincular:', error);
            }
        );
        // Limpia las selecciones y cierra el modal
        this.selectedAlumnos = [];
        this.showModal = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    openAlumnoModal(pago: any): void {
        this.selectedPago = pago;
        this.listarAlumnos();
        this.showModal = true;
    }

    openPagoAlumnoModal(pago: any): void {
        this.selectedPago = pago;
        this.listarPagoVinculadoPorAlumno();
    }

    applyFilters(): void {
        // Comienza con la lista original
        this.filteredAlumnos = [...this.alumnosList];

        // Filtrar por ciclo si está seleccionado
        if (this.selectedCiclo) {
            this.filteredAlumnos = this.filteredAlumnos.filter(
                (alumno) => alumno.ciclo_id === this.selectedCiclo
            );
        }

        // Filtrar por texto si hay un valor
        if (this.searchText && this.searchText.trim() !== '') {
            const searchTextLower = this.searchText.toLowerCase();

            this.filteredAlumnos = this.filteredAlumnos.filter(
                (alumno) =>
                    alumno.nombres?.toLowerCase().includes(searchTextLower) ||
                    alumno.codigo?.toLowerCase().includes(searchTextLower)
            );
        }
    }
    applyFilters2(): void {
        // Comienza con la lista original
        this.filteredPagoAlumnos = [...this.pagoAlumnosList['alumnos']];

        // Filtrar por ciclo si está seleccionado
        if (this.selectedCiclo) {
            this.filteredPagoAlumnos = this.filteredPagoAlumnos.filter(
                (alumno) => alumno.ciclo_id === this.selectedCiclo
            );
        }

        // Filtrar por texto si hay un valor
        if (this.searchText && this.searchText.trim() !== '') {
            const searchTextLower = this.searchText.toLowerCase();

            this.filteredPagoAlumnos = this.filteredPagoAlumnos.filter(
                (alumno) =>
                    alumno.nombres?.toLowerCase().includes(searchTextLower) ||
                    alumno.codigo?.toLowerCase().includes(searchTextLower)
            );
        }
    }

    onCicloChange(): void {
        // Filtra la lista de alumnos según el ciclo seleccionado
        this.applyFilters();
    }
    onCicloChange2(): void {
        // Filtra la lista de alumnos según el ciclo seleccionado
        this.applyFilters2();
    }

    onSearchChange(): void {
        this.applyFilters();
    }
    onSearchChange2(): void {
        this.applyFilters2();
    }

    abrirModalNuevoPago(): void {
        this.showCreatePagoModal = true;
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    resetForm(): void {
        this.newPago = {
            nombre: '',
            descripcion: '',
            monto: null,
            fechaPago: null,
            fechaVencimiento: null,
            estado_id: null,
        };
    }

    validatePayment(alumno: any): void {
        this.selectedAlumno = alumno; // Guarda el alumno seleccionado

        if (
            this.selectedAlumno.voucher_pago === '' ||
            this.selectedAlumno.voucher_pago === null
        ) {
            return this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se subio ningun pago para este alumno',
                life: 3000,
            });
        }

        this.showVoucherModal = true; // Abre un modal para previsualizar el pago
        console.log(this.selectedAlumno);

        console.log('Validando pago del alumno:', alumno);
    }

    confirmPayment(alumno: any): void {
        // const alumno_id = alumno.includesconst
        console.log(this.domain_id, this.selectedPago.id, alumno.id);

        this.pagoService
            .confirmPayment(this.domain_id, alumno.id, this.selectedPago.id)
            .subscribe(
                (response: any) => {
                    console.log(response);

                    this.showVoucherModal = false; // Cierra el modal
                    this.listarPagoVinculadoPorAlumno();

                    return this.messageService.add({
                        severity: 'success',
                        summary: 'Exito',
                        detail: 'Se realizo la validación del pago',
                        life: 3000,
                    });
                },
                (error: any) => {
                    console.log(error);

                    return this.messageService.add({
                        severity: 'error',
                        summary: 'error',
                        detail: error.error.message,
                        life: 3000,
                    });
                }
            );
    }
}
