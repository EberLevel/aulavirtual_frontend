import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAcademicaComponent } from './informacion-academica.component';

describe('InformacionAcademicaComponent', () => {
  let component: InformacionAcademicaComponent;
  let fixture: ComponentFixture<InformacionAcademicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionAcademicaComponent]
    });
    fixture = TestBed.createComponent(InformacionAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
