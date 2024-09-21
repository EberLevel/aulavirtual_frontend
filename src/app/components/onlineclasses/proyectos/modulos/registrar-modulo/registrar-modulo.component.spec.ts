import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarModuloComponent } from './registrar-modulo.component';

describe('RegistrarTareaComponent', () => {
  let component: RegistrarModuloComponent;
  let fixture: ComponentFixture<RegistrarModuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarModuloComponent]
    });
    fixture = TestBed.createComponent(RegistrarModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
