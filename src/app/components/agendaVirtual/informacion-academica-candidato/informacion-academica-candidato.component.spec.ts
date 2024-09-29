import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAcademicaCandidatoComponent } from './informacion-academica-candidato.component';

describe('InformacionAcademicaCandidatoComponent', () => {
  let component: InformacionAcademicaCandidatoComponent;
  let fixture: ComponentFixture<InformacionAcademicaCandidatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionAcademicaCandidatoComponent]
    });
    fixture = TestBed.createComponent(InformacionAcademicaCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
