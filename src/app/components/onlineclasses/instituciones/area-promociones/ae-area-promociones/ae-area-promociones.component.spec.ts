import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeAreaPromocionesComponent } from './ae-area-promociones.component';

describe('AeAreaPromocionesComponent', () => {
  let component: AeAreaPromocionesComponent;
  let fixture: ComponentFixture<AeAreaPromocionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeAreaPromocionesComponent]
    });
    fixture = TestBed.createComponent(AeAreaPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
