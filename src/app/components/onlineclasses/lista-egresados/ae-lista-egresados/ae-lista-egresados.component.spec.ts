import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeListaEgresadosComponent } from './ae-lista-egresados.component';

describe('AeListaEgresadosComponent', () => {
  let component: AeListaEgresadosComponent;
  let fixture: ComponentFixture<AeListaEgresadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeListaEgresadosComponent]
    });
    fixture = TestBed.createComponent(AeListaEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
