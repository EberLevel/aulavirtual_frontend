import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionPostulanteComponent } from './capacitacion-postulante.component';

describe('CapacitacionPostulanteComponent', () => {
  let component: CapacitacionPostulanteComponent;
  let fixture: ComponentFixture<CapacitacionPostulanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapacitacionPostulanteComponent]
    });
    fixture = TestBed.createComponent(CapacitacionPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
