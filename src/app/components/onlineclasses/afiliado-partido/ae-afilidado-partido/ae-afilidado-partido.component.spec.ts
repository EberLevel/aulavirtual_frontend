import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeAfilidadoPartidoComponent } from './ae-afilidado-partido.component';

describe('AeAfilidadoPartidoComponent', () => {
  let component: AeAfilidadoPartidoComponent;
  let fixture: ComponentFixture<AeAfilidadoPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeAfilidadoPartidoComponent]
    });
    fixture = TestBed.createComponent(AeAfilidadoPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
