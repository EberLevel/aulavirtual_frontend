import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeProfesionesComponent } from './ae-profesiones.component';

describe('AeProfesionesComponent', () => {
  let component: AeProfesionesComponent;
  let fixture: ComponentFixture<AeProfesionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeProfesionesComponent]
    });
    fixture = TestBed.createComponent(AeProfesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
