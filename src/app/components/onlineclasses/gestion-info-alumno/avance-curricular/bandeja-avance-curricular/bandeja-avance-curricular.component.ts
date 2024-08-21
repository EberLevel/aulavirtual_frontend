import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CursoService } from '../../../service/cursos.service';
import { HelpersService } from 'src/app/helpers.service';

@Component({
    selector: 'app-bandeja-avance-curricular',
    templateUrl: './bandeja-avance-curricular.component.html',
    styleUrls: ['./bandeja-avance-curricular.component.scss'],
})
export class BandejaAvanceCurricularComponent implements OnInit {
  cursosList: any[] = [];  // Lista de cursos
  loading: boolean = false;
  alumnoId: number | null = null;  // ID del alumno

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') tabledt1: Table | undefined;


    constructor(private cursoService: CursoService, private helpersService: HelpersService) { }

    ngOnInit(): void {
      this.alumnoId = this.helpersService.getAlumnoId();  // Obtener el ID del alumno logueado
  
      if (this.alumnoId) {
        this.getCursosPorAlumno(this.alumnoId);
        console.log(this.alumnoId)
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
        (response: any) => {
          this.cursosList = response;
          this.loading = false;
        },
        (error: any) => {
          console.error('Error al cargar los cursos:', error);
          this.loading = false;
        }
      );
    }
}
