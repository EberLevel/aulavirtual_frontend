import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEscalaComponent } from './ae-escala.component';

describe('AeEscalaComponent', () => {
  let component: AeEscalaComponent;
  let fixture: ComponentFixture<AeEscalaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeEscalaComponent]
    });
    fixture = TestBed.createComponent(AeEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
