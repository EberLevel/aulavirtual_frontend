import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeInformacionAcademicaComponent } from './ae-informacion-academica.component';

describe('AeInformacionAcademicaComponent', () => {
  let component: AeInformacionAcademicaComponent;
  let fixture: ComponentFixture<AeInformacionAcademicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeInformacionAcademicaComponent]
    });
    fixture = TestBed.createComponent(AeInformacionAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
