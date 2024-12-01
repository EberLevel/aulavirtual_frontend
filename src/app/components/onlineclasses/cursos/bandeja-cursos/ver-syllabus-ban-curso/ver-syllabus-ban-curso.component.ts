import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-ver-syllabus-ban-curso',
  templateUrl: './ver-syllabus-ban-curso.component.html',
  styleUrls: ['./ver-syllabus-ban-curso.component.scss']
})
export class VerSyllabusBanCursoComponent {

  contenido: string = ''; 
  titulo: string = ''; 
  modules = {
      toolbar: false
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit(): void {
    console.log('Datos recibidos en el componente:', this.config.data);
    this.contenido = this.config.data.contenido || 'No hay contenido disponible.';
    this.titulo = this.config.data.titulo || 'Visualizar Contenido';
}




  closeModal() {
    this.ref.close();
  }
}
