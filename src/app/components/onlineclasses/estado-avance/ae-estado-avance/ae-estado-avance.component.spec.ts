import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEstadoAvanceComponent } from './ae-estado-avance.component';

describe('AeEstadoAvanceComponent', () => {
  let component: AeEstadoAvanceComponent;
  let fixture: ComponentFixture<AeEstadoAvanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeEstadoAvanceComponent]
    });
    fixture = TestBed.createComponent(AeEstadoAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
