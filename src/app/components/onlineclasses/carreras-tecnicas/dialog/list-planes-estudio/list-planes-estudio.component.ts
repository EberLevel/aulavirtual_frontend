import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PlanDeEstudiosService } from '../../../service/plan-de-estudios.service';

@Component({
    selector: 'app-list-planes-estudio',
    templateUrl: './list-planes-estudio.component.html',
    styleUrls: ['./list-planes-estudio.component.scss'],
})
export class ListPlanesEstudioComponent implements OnInit {
    planEstudio: any[] = []; // Ahora es un arreglo de objetos
    loading: boolean = true;

    constructor(
        private planDeEstudiosService: PlanDeEstudiosService,
        public config: DynamicDialogConfig // Recibir datos
    ) {}

    ngOnInit(): void {
        const carreraId = this.config.data.carreraId; // Extraer el ID de la carrera
        this.obtenerPlanDeEstudio(carreraId);
    }

    obtenerPlanDeEstudio(carreraId: number): void {
        this.planDeEstudiosService
            .getPlanDeEstudioPorCarrera(carreraId)
            .subscribe(
                (response: any) => {
                    if (response && response.length > 0) {
                        this.planEstudio = response; // Asignar directamente el arreglo recibido
                    } else {
                        // Si no hay datos, dejamos planEstudio como un arreglo vacío
                        this.planEstudio = [];
                    }
                    this.loading = false;
                },
                (error) => {
                    console.error(
                        'Error al obtener el plan de estudios:',
                        error
                    );
                    this.planEstudio = []; // Para manejar casos de error
                    this.loading = false;
                }
            );
    }
}
