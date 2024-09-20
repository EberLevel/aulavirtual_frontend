import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGEvAlumnoComponent } from './ver-g-ev-alumno.component';

describe('VerGEvAlumnoComponent', () => {
  let component: VerGEvAlumnoComponent;
  let fixture: ComponentFixture<VerGEvAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerGEvAlumnoComponent]
    });
    fixture = TestBed.createComponent(VerGEvAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
