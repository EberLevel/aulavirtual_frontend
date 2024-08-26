import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeModalidadPuestoComponent } from './ae-modalidad-puesto.component';

describe('AeModalidadPuestoComponent', () => {
  let component: AeModalidadPuestoComponent;
  let fixture: ComponentFixture<AeModalidadPuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeModalidadPuestoComponent]
    });
    fixture = TestBed.createComponent(AeModalidadPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
