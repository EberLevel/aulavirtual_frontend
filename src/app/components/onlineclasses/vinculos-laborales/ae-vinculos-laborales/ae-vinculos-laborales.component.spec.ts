import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeVinculosLaboralesComponent } from './ae-vinculos-laborales.component';

describe('AeVinculosLaboralesComponent', () => {
  let component: AeVinculosLaboralesComponent;
  let fixture: ComponentFixture<AeVinculosLaboralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeVinculosLaboralesComponent]
    });
    fixture = TestBed.createComponent(AeVinculosLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
