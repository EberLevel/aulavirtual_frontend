import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeInformacionAcademicaCandidatoComponent } from './ae-informacion-academica-candidato.component';

describe('AeInformacionAcademicaCandidatoComponent', () => {
  let component: AeInformacionAcademicaCandidatoComponent;
  let fixture: ComponentFixture<AeInformacionAcademicaCandidatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeInformacionAcademicaCandidatoComponent]
    });
    fixture = TestBed.createComponent(AeInformacionAcademicaCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
