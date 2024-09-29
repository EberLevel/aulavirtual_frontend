import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEgresadosComponent } from './lista-egresados.component';

describe('ListaEgresadosComponent', () => {
  let component: ListaEgresadosComponent;
  let fixture: ComponentFixture<ListaEgresadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEgresadosComponent]
    });
    fixture = TestBed.createComponent(ListaEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
