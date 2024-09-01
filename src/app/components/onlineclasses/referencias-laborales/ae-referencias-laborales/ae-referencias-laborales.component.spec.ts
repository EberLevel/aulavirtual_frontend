import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeReferenciasLaboralesComponent } from './ae-referencias-laborales.component';

describe('AeReferenciasLaboralesComponent', () => {
  let component: AeReferenciasLaboralesComponent;
  let fixture: ComponentFixture<AeReferenciasLaboralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeReferenciasLaboralesComponent]
    });
    fixture = TestBed.createComponent(AeReferenciasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
