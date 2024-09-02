import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFinalPostulanteComponent } from './formulario-final-postulante.component';

describe('FormularioFinalPostulanteComponent', () => {
  let component: FormularioFinalPostulanteComponent;
  let fixture: ComponentFixture<FormularioFinalPostulanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioFinalPostulanteComponent]
    });
    fixture = TestBed.createComponent(FormularioFinalPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
