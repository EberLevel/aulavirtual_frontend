import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PlanDeEstudiosService } from '../../../service/plan-de-estudios.service';

@Component({
    selector: 'app-list-planes-estudio',
    templateUrl: './list-planes-estudio.component.html',
    styleUrls: ['./list-planes-estudio.component.scss'],
})
export class ListPlanesEstudioComponent implements OnInit {
    planEstudio: any = null;
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
        this.planDeEstudiosService.getPlanDeEstudioPorCarrera(carreraId).subscribe(
            (response: any) => {
                this.planEstudio = {
                    ...response,
                    formattedDate: this.formatDate(response.created_at),
                };
                this.loading = false;
            },
            (error) => {
                console.error('Error al obtener el plan de estudios:', error);
                this.loading = false;
            }
        );
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getFullYear()}`;
    }
}
