import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeNivelPuestoComponent } from './ae-nivel-puesto.component';

describe('AeNivelPuestoComponent', () => {
  let component: AeNivelPuestoComponent;
  let fixture: ComponentFixture<AeNivelPuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeNivelPuestoComponent]
    });
    fixture = TestBed.createComponent(AeNivelPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
