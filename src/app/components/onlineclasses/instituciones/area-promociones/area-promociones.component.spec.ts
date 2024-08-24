import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPromocionesComponent } from './area-promociones.component';

describe('AreaPromocionesComponent', () => {
  let component: AreaPromocionesComponent;
  let fixture: ComponentFixture<AreaPromocionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaPromocionesComponent]
    });
    fixture = TestBed.createComponent(AreaPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
