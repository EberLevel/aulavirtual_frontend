import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CursoService } from '../../../service/cursos.service';
import { HelpersService } from 'src/app/helpers.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-bandeja-avance-curricular',
    templateUrl: './bandeja-avance-curricular.component.html',
    styleUrls: ['./bandeja-avance-curricular.component.scss'],
})
export class BandejaAvanceCurricularComponent implements OnInit {
    cursosList: any[] = []; // Lista de cursos
    loading: boolean = false;
    alumnoId!: number;

    estadoOptions: SelectItem[] = [
        { label: 'Pendiente', value: 1 },
        { label: 'En Proceso', value: 2 },
    ];

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;

    constructor(
        private cursoService: CursoService,
        private helpersService: HelpersService,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        const alumno = this.config.data.alumno; // Accede a los datos del diálogo
        if (alumno && alumno.id) {
            this.alumnoId = alumno.id;
            this.getCursosPorAlumno(this.alumnoId);
            console.log('Alumno ID:', this.alumnoId);
        } else {
            console.error('No se pudo obtener el ID del alumno.');
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    getCursosPorAlumno(alumnoId: number): void {
        this.loading = true;
        this.cursoService.getCursosPorAlumno(alumnoId).subscribe(
            (data: any) => {
                // Aquí asigna el estado_id de la respuesta al estado que manejará el dropdown
                console.log('Datos recibidos:', data);
                
                this.cursosList = data.map((curso: any) => {
                    return {
                        ...curso,
                        estado: this.estadoOptions.find(option => option.value === curso.estado_id)  // Encuentra el estado correcto
                    };
                });
                this.loading = false;
            },
            (error: any) => {
                console.error('Error al cargar los cursos:', error);
                this.loading = false;
            }
        );
    }
    
    onEstadoChange(event: any, curso: any): void {
      const estadoId = event.value;
  
      const estadoData = {
          cursoId: curso.id,
          estadoId: estadoId.value,
          alumnoId: this.alumnoId 
      };
      console.log("estadoData" , estadoData)
  
      this.cursoService.updateCursoEstado(estadoData).subscribe(
          (response: any) => {
              console.log('Estado actualizado:', response);
          },
          (error: any) => {
              console.error('Error al actualizar el estado:', error);
          }
      );
  }
  
  
}
