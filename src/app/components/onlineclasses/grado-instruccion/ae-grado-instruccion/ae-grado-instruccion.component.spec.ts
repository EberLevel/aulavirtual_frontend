import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeGradoInstruccionComponent } from './ae-grado-instruccion.component';

describe('AeGradoInstruccionComponent', () => {
  let component: AeGradoInstruccionComponent;
  let fixture: ComponentFixture<AeGradoInstruccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeGradoInstruccionComponent]
    });
    fixture = TestBed.createComponent(AeGradoInstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
