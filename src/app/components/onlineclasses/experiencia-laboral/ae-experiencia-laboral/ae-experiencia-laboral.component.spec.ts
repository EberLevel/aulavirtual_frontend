import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeExperienciaLaboralComponent } from './ae-experiencia-laboral.component';

describe('AeExperienciaLaboralComponent', () => {
  let component: AeExperienciaLaboralComponent;
  let fixture: ComponentFixture<AeExperienciaLaboralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeExperienciaLaboralComponent]
    });
    fixture = TestBed.createComponent(AeExperienciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
