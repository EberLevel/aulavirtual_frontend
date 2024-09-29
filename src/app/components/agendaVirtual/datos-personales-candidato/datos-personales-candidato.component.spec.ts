import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonalesCandidatoComponent } from './datos-personales-candidato.component';

describe('DatosPersonalesCandidatoComponent', () => {
  let component: DatosPersonalesCandidatoComponent;
  let fixture: ComponentFixture<DatosPersonalesCandidatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosPersonalesCandidatoComponent]
    });
    fixture = TestBed.createComponent(DatosPersonalesCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
