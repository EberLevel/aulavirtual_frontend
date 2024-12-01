import { Component, OnInit } from '@angular/core';
import {
    DynamicDialogConfig,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { PlanDeEstudiosService } from '../../../service/plan-de-estudios.service';
import { ListCursosPlanEstudioComponent } from '../list-cursos-plan-estudio/list-cursos-plan-estudio.component';

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
        public config: DynamicDialogConfig, // Recibir datos
        private dialogService: DialogService, // Para abrir el modal
        private ref: DynamicDialogRef
    ) {}

    ngOnInit(): void {
        const carreraId = this.config.data.carreraId;
        console.log('carreraIdcarreraId', carreraId);
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

    navigateListPlan(plan: any): void {
        const carreraId = this.config.data.carreraId; 
        this.ref = this.dialogService.open(ListCursosPlanEstudioComponent, {
            width: '80%',
            styleClass: 'custom-dialog-header',
            data: {
                planEstudioId: plan.estado_id, 
                carreraId: carreraId,
            },
        });

        this.ref.onClose.subscribe(() => {
            console.log('Reporte cerrado');
        });
    }
}
