import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeCityFormComponent } from './ae-city-form.component';

describe('AeCityFormComponent', () => {
  let component: AeCityFormComponent;
  let fixture: ComponentFixture<AeCityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeCityFormComponent]
    });
    fixture = TestBed.createComponent(AeCityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
