import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProyectoComponent } from './registrar-proyecto.component';

describe('RegistrarProyectoComponent', () => {
  let component: RegistrarProyectoComponent;
  let fixture: ComponentFixture<RegistrarProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarProyectoComponent]
    });
    fixture = TestBed.createComponent(RegistrarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
