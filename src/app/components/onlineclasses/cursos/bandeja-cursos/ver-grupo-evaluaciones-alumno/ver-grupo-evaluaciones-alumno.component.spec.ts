import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGrupoEvaluacionesAlumnoComponent } from './ver-grupo-evaluaciones-alumno.component';

describe('VerGrupoEvaluacionesAlumnoComponent', () => {
  let component: VerGrupoEvaluacionesAlumnoComponent;
  let fixture: ComponentFixture<VerGrupoEvaluacionesAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerGrupoEvaluacionesAlumnoComponent]
    });
    fixture = TestBed.createComponent(VerGrupoEvaluacionesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
