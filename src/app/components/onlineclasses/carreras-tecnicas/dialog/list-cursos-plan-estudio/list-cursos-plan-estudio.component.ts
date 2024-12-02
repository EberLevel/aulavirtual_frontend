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
        const planEstudioId = this.config.data?.planEstudioId; // Recibe el ID del plan de estudio
        const carreraId = this.config.data?.carreraId; // Recibe el ID de la carrera
        console.log('planEstudioIdplanEstudioId', carreraId, planEstudioId);
        if (!planEstudioId || !carreraId) {
            console.error('Faltan parámetros para cargar las unidades didácticas.');
            this.loading = false;
            return;
        }
    
        this.obtenerUnidadesDidacticas(planEstudioId, carreraId);
    }
    

    obtenerUnidadesDidacticas(planEstudioId: number, carreraId: number): void {
        this.cursoService
            .getCursosByPlanEstudioYCarrera(planEstudioId, carreraId)
            .subscribe(
                (response: any) => {
                    console.log('Cursos obtenidos:', response);
                    if (response && response.length > 0) {
                        this.unidadesDidacticas = response.map(
                            (curso: any) => ({
                                curso_nombre: curso.curso_nombre,
                                carrera_nombre: curso.carrera_nombre,
                                plan_de_estudio_nombre:
                                    curso.plan_de_estudio_nombre,
                            })
                        );
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
