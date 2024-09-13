import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEvaluacionPresencialComponent } from './listado-evaluacion-presencial.component';

describe('ListadoEvaluacionPresencialComponent', () => {
  let component: ListadoEvaluacionPresencialComponent;
  let fixture: ComponentFixture<ListadoEvaluacionPresencialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoEvaluacionPresencialComponent]
    });
    fixture = TestBed.createComponent(ListadoEvaluacionPresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
