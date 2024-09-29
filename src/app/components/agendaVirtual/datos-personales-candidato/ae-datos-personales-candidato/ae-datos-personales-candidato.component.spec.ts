import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeDatosPersonalesCandidatoComponent } from './ae-datos-personales-candidato.component';

describe('AeDatosPersonalesCandidatoComponent', () => {
  let component: AeDatosPersonalesCandidatoComponent;
  let fixture: ComponentFixture<AeDatosPersonalesCandidatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeDatosPersonalesCandidatoComponent]
    });
    fixture = TestBed.createComponent(AeDatosPersonalesCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
