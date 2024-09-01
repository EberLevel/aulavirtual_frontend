import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeCapacitacionPostulanteComponent } from './ae-capacitacion-postulante.component';

describe('AeCapacitacionPostulanteComponent', () => {
  let component: AeCapacitacionPostulanteComponent;
  let fixture: ComponentFixture<AeCapacitacionPostulanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeCapacitacionPostulanteComponent]
    });
    fixture = TestBed.createComponent(AeCapacitacionPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
