import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSyllabusBanCursoComponent } from './ver-syllabus-ban-curso.component';

describe('VerSyllabusBanCursoComponent', () => {
  let component: VerSyllabusBanCursoComponent;
  let fixture: ComponentFixture<VerSyllabusBanCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerSyllabusBanCursoComponent]
    });
    fixture = TestBed.createComponent(VerSyllabusBanCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
