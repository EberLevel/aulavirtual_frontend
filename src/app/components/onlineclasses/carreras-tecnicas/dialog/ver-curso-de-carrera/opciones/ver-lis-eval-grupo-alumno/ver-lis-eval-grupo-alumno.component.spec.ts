import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLisEvalGrupoAlumnoComponent } from './ver-lis-eval-grupo-alumno.component';

describe('VerLisEvalGrupoAlumnoComponent', () => {
  let component: VerLisEvalGrupoAlumnoComponent;
  let fixture: ComponentFixture<VerLisEvalGrupoAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerLisEvalGrupoAlumnoComponent]
    });
    fixture = TestBed.createComponent(VerLisEvalGrupoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
