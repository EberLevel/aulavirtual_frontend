import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Miembro, Pagos } from '../../interface/general';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PagoService } from '../../service/pago.service';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/helpers.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class PagoComponent implements OnInit {
  loading: boolean = false;


  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') tabledt1: Table | undefined;
  @Input() miembro: Miembro[] = [];
  @Output() miembrosActualizados = new EventEmitter<Miembro[]>();

  ref: DynamicDialogRef | undefined;

  pagosList: Pagos[] = []
  selectedPago: any = null
  alumnosList: any[] = []
  selectedAlumnos: any[] = []
  ciclosList: any[] = []
  selectedCiclo: any = null
  searchText: string = '' // Para el texto de búsqueda
  filteredAlumnos: any[] = [] // Lista filtrada de alumnos
  estadosList: any[] = []
  showModal: boolean = false
  domain_id: number = 1
  showCreatePagoModal: boolean = false

  newPago: any = {
    nombre: '',
    descripcion: '',
    monto: null,
    fecha_pago: null,
    fecha_vencimiento: null,
    estado_id: null
  };


  constructor(
    private dialogService: DialogService,
    private pagoService: PagoService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private helpersService: HelpersService
  ) { }


  ngOnInit(): void {
    this.domain_id = this.helpersService.getDominioId()
    this.listarPagos();
    this.listarCiclos();
    this.listarEstados();
  }

  listarPagos(): void {
    this.pagoService.listarPagos(this.domain_id).subscribe((response: any) => {
      this.pagosList = response;
      console.log('Pagos:', this.pagosList);
    })
  }

  listarCiclos(): void {
    // Simula la lista de ciclos o haz una llamada al backend
    this.pagoService.listarCiclos(this.domain_id).subscribe((response: any[]) => {
      this.ciclosList = response.map(ciclo => ({
        label: ciclo.nombre,
        value: ciclo.id
      }))

      console.log('ciclos: ', this.ciclosList);

    })
  }

  listarEstados(): void {
    this.estadosList = [
      {
        label: 'EN PROCESO',
        value: 2
      },
      {
        label: 'VENCIDO',
        value: 19
      },
      {
        label: 'COMPLETADO',
        value: 20
      }
    ]
  }

  listarAlumnos(): void {
    this.pagoService.listarAlumnos(this.domain_id).subscribe((response: any) => {
      this.alumnosList = response

      console.log('alumnos: ', this.alumnosList);

      this.filteredAlumnos = [...this.alumnosList]
      console.log('alumnos filtro: ', this.filteredAlumnos);
    })

    // Aplica filtro por texto si hay un valor de búsqueda
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
    };

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
    console.log('Vinculando los alumnos:', this.selectedAlumnos, 'al pago:', this.selectedPago);


    console.log(this.selectedAlumnos);
    
    // Muestra un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alumnos vinculados con éxito.' });

    // Limpia las selecciones y cierra el modal
    this.selectedAlumnos = [];
    this.showModal = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    )
  }

  openAlumnoModal(pago: any): void {
    this.selectedPago = pago;
    this.listarAlumnos();
    this.showModal = true;
  }

  applyFilters(): void {
    // Comienza con la lista original
    this.filteredAlumnos = [...this.alumnosList];

    // Filtrar por ciclo si está seleccionado
    if (this.selectedCiclo) {
      this.filteredAlumnos = this.filteredAlumnos.filter(alumno => alumno.ciclo_id === this.selectedCiclo);
    }

    // Filtrar por texto si hay un valor
    if (this.searchText && this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();

      this.filteredAlumnos = this.filteredAlumnos.filter(alumno =>
        alumno.nombres?.toLowerCase().includes(searchTextLower) ||
        alumno.codigo?.toLowerCase().includes(searchTextLower)
      );
    }
  }

  onCicloChange(): void {
    // Filtra la lista de alumnos según el ciclo seleccionado
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
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
}
