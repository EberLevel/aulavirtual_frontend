import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeListaPostulantesComponent } from './ae-lista-postulantes.component';

describe('AeListaPostulantesComponent', () => {
  let component: AeListaPostulantesComponent;
  let fixture: ComponentFixture<AeListaPostulantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeListaPostulantesComponent]
    });
    fixture = TestBed.createComponent(AeListaPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
