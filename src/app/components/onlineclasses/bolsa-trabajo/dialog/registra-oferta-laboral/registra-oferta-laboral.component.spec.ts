import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraOfertaLaboralComponent } from './registra-oferta-laboral.component';

describe('RegistraOfertaLaboralComponent', () => {
  let component: RegistraOfertaLaboralComponent;
  let fixture: ComponentFixture<RegistraOfertaLaboralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistraOfertaLaboralComponent]
    });
    fixture = TestBed.createComponent(RegistraOfertaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
