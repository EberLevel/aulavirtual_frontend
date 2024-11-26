import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CursoService } from '../../../service/cursos.service';

@Component({
    selector: 'app-list-cursos-plan-estudio',
    templateUrl: './list-cursos-plan-estudio.component.html',
    styleUrls: ['./list-cursos-plan-estudio.component.scss'],
})
export class ListCursosPlanEstudioComponent implements OnInit {
    unidadesDidacticas: any[] = []; // Lista de unidades didácticas
    loading: boolean = true;

    constructor(
        private cursoService: CursoService,
        public config: DynamicDialogConfig // Recibir datos
    ) {}

    ngOnInit(): void {
        console.log(
            'this.config.data?.carreraId;',
            this.config.data?.carreraId
        );
        const planEstudioId = this.config.data?.carreraId;
        this.obtenerUnidadesDidacticas(planEstudioId);
    }

    obtenerUnidadesDidacticas(planEstudioId: number): void {
        this.cursoService.getCursosByPlanEstudio(planEstudioId).subscribe(
            (response: any) => {
                console.log('first', response);
                if (response && response.length > 0) {
                    this.unidadesDidacticas = response.map((curso: any) => {
                        return {
                            curso_nombre: curso.curso_nombre,
                            carrera_nombre: curso.carrera_nombre,
                            plan_de_estudio_nombre: curso.plan_de_estudio_nombre,
                        };
                    });
                } else {
                    this.unidadesDidacticas = [];
                }
                this.loading = false;
            },
            (error) => {
                console.error(
                    'Error al obtener las unidades didácticas:',
                    error
                );
                this.unidadesDidacticas = [];
                this.loading = false;
            }
        );
    }
}
