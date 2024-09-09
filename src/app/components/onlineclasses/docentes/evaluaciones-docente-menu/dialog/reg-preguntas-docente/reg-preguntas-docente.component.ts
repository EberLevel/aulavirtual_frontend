import { Component } from '@angular/core';

@Component({
  selector: 'app-reg-preguntas-docente',
  templateUrl: './reg-preguntas-docente.component.html',
  styleUrls: ['./reg-preguntas-docente.component.scss']
})
export class RegPreguntasDocenteComponent {
  checkboxChecked: boolean = false;

  selectedEstado: any;
  estados =[
    { name: 'Pendiente' },
    { name: 'En Proceso' },
    { name: 'Culminado' }
  ];

  opciones: any[] = [
    { label: 'Alternativa 1', value: 1 },
    { label: 'Alternativa 2', value: 2 },
    { label: 'Alternativa 3', value: 3 },
    { label: 'Alternativa 4', value: 4 },
    { label: 'Alternativa 5', value: 5 },
  ];
  selectedOptions: any[] = [];
  guardarpreguntas(){

  }
  closeModal(){

  }
  onAulaChange(){

  }
  onCheckboxChange() {
    if (!this.checkboxChecked) {
      this.selectedOptions = [];
    }
  }

}
