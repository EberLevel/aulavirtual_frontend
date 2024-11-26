import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnidadDidacticaComponent } from './list-unidad-didactica.component';

describe('ListUnidadDidacticaComponent', () => {
  let component: ListUnidadDidacticaComponent;
  let fixture: ComponentFixture<ListUnidadDidacticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUnidadDidacticaComponent]
    });
    fixture = TestBed.createComponent(ListUnidadDidacticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
