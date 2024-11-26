import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCursosPlanEstudioComponent } from './list-cursos-plan-estudio.component';

describe('ListCursosPlanEstudioComponent', () => {
  let component: ListCursosPlanEstudioComponent;
  let fixture: ComponentFixture<ListCursosPlanEstudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCursosPlanEstudioComponent]
    });
    fixture = TestBed.createComponent(ListCursosPlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
